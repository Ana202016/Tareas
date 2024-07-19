import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import {  TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-cat.dto';
import { Prisma, Task } from '@prisma/client';
import { UpdateProjectDto } from 'src/models/projects/dto/update-project.dto';

// localhost/tasks
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
  
    //Get: /tasks/ (index)
    @Get()
    getTasks(){
        return this.tasksService.getTasks();       
    }
   
    //POST: /tasks/ (crear una tarea)
    @Post()
    createTask(@Body() newTask : CreateTaskDto ) {
        return this.tasksService.createTask(newTask);
    }

    //PUT: /tasks/:id (actualizar tarea por ID)
    @Put(':id')
    updateTask(@Param ('id', ParseIntPipe) id:number, @Body() taskData: UpdateProjectDto) {
        return this.tasksService.updateTask(id, taskData as Prisma.TaskUpdateInput);
    }
    

    //DELETE: /tasks/:id (eliminar tarea por id)
    @Delete(':id')
    deleteTask( @Param('id', ParseIntPipe)id : number) {
        return this.tasksService.deleteTask(id);
    }

    //show (ver tarea por id)
    @Get(':id')
    getTask(@Param('id', ParseIntPipe) id:number): Promise <Task> {
        return this.tasksService.getTask(id);
    }
}


