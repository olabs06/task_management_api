import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {
    this.logger.log('TaskService initialized with TaskModel');
    this.logger.debug(
      `TaskModel name: ${this.taskModel ? this.taskModel.modelName : 'undefined'}`
    );
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new BadRequestException(
        'Title is required and must be a non-empty string'
      );
    }

    if (description && typeof description !== 'string') {
      throw new BadRequestException('Description must be a string if provided');
    }

    const task = new this.taskModel({
      id: uuidv4(),
      title: title.trim(),
      description: description?.trim(),
      createdAt: new Date(),
    });

    this.logger.log(`Creating task: ${title}`);
    return task.save();
  }

  async findAll(): Promise<Task[]> {
    this.logger.log('Fetching all tasks');
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task | null> {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Valid ID is required');
    }
    this.logger.log(`Fetching task with ID: ${id}`);
    return this.taskModel.findOne({ id }).exec();
  }
}
