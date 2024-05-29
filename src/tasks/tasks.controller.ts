import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {  Task,TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-cat.dto';

// localhost/tasks
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
  
    //Get: /tasks/ (index)
    @Get()
    findAll() : Task []{
        return this.tasksService.findAll();

        
    }
   
    //POST: /tasks/ (crear una tarea)
    @Post()
    createTask(@Body() newTask : CreateTaskDto ): Task {
        return this.tasksService.createTask(newTask as Task);
    }

    //PUT: /tasks/:id (actualizar tarea por ID)
    @Put(':id')
    updateTask(@Param ('id') id:string, @Body() taskData : UpdateTaskDto) : string {

        return this.tasksService.updateTask(parseInt(id), taskData as Task);
    }

    //DELETE: /tasks/:id (eliminar tarea por id)
    @Delete(':id')
    deleteTask( @Param('id')id : string) : string {
        return this.tasksService.deleteTask(parseInt(id));
    }

    //show (ver tarea por id)
    @Get(':id')
    getTask(@Param('id') id:string) : Task {
        return this.tasksService.getTask(parseInt(id));
    }
}


