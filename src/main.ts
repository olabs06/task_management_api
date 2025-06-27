import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(TasksModule);
  
  // Enable CORS for development
  app.enableCors({
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  });

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

    await app.listen(3000);
    logger.log(`Application is running on: ${await app.getUrl()}`);
  }
bootstrap();