import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) {
          throw new Error('MONGODB_URI not found in .env file');
        }
        return {
          uri,
          connectionFactory: (connection: Connection) => {
            const logger = new Logger('Mongoose');
            logger.log(`MongoDB connection state: ${connection.readyState}`);
            connection.on('connected', () =>
              logger.log('MongoDB connected successfully')
            );
            connection.on('error', (err) =>
              logger.error(`MongoDB connection error: ${err}`)
            );
            connection.on('disconnected', () =>
              logger.warn('MongoDB disconnected')
            );
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    this.logger.log('AppModule initialized');
  }
}
