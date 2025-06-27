import { Module, Logger } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('Mongoose');
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) {
          logger.error('MONGODB_URI is not defined in environment variables');
          throw new Error('MONGODB_URI is not defined');
        }
        logger.log(`Connecting to MongoDB at ${uri.replace(/:([^@]+)@/, ':****@')}`);
        return {
          uri,
          connectionFactory: (connection) => {
            connection.on('connected', () => logger.log('MongoDB connected successfully'));
            connection.on('error', (err) => logger.error(`MongoDB connection error: ${err}`));
            connection.on('disconnected', () => logger.warn('MongoDB disconnected'));
            return connection;
          },
        } as MongooseModuleOptions;
      },
      inject: [ConfigService],
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}