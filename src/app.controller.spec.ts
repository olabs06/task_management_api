import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from './tasks/schemas/task.schema';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: {}, // Mock the Mongoose model
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    controller = module.get<TasksController>(TasksController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
