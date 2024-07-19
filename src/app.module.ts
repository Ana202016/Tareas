import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './models/tasks/tasks.module';

import { ProjectsModule } from './models/projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './models/projects/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true}),
    TasksModule,
    ProjectsModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
