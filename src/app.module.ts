import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './models/tasks/tasks.module';

import { ProjectsModule } from './models/projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './models/projects/users/users.module';

@Module({
  imports: [
    TasksModule,
    ProjectsModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
