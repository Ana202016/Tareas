import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-cat.dto';

export type Task = {
    id: Number,
    description: String,
    date: Date,
    completed?: Boolean,
}

@Injectable()
export class TasksService {

    private tasks: Task[] =[
        {
            id: 1,
            description: 'Crear módulo',
            date : new Date(),
        },
        {
            id: 2,
            description: 'Crear módulo',
            date : new Date(),
        },
        {
            id: 3,
            description: 'Crear módulo',
            date : new Date(),
        },

        
    ];
   

    /**
     * 
     * @returns 
     */
    findAll() : Task[] {

       
        return this.tasks;
         
    }
/**
 * Crear tarea
 * @param task 
 * @returns 
 */
   /* createTask (task: Task){

        const taskData = {
            id: this.tasks.length + 1,
            ...task
        }

        this.tasks.push(taskData);

        return taskData
    }*/
    createTask(createTaskDto: CreateTaskDto): Task {
        const taskData = {
          id: this.tasks.length + 1,
          ...createTaskDto,
          date: new Date(createTaskDto.date),
        };
    
        this.tasks.push(taskData);
        return taskData;
      }

  /*  updateTask(id:number, task: Task): string {
        //buscar la tarea en el arreglo
        //actualizar los datos
        //retornar "ok"
        
        console.log(id, task);
        return "ok";

    }*/
    updateTask(id: number, updateTaskDto: Partial<Task>): string {
        const taskIndex = this.tasks.findIndex((item) => item.id === id);
    
        if (taskIndex === -1) {
          throw new NotFoundException(`Tarea ${id} no encontrada`);
        }
      
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updateTaskDto };
        console.log(id, this.tasks);
        return "Tarea actualizada correctamente";
        
        
      }

   /* deleteTask (id:number):string{
        //logica para eliminar la tarea con el id recibido

        return "deleted";
    }*/
    deleteTask(id: number): string {
        const taskIndex = this.tasks.findIndex((item) => item.id === id);
    
        if (taskIndex === -1) {
          throw new NotFoundException(`Tarea ${id} no encontrada`);
        }
    
        this.tasks.splice(taskIndex, 1);
        return `Tarea ${id} eliminada`;
      }
    

/*    getTask(id: number): Task{
        return this.tasks.find((item) => item.id == id);
    }
}*/
getTask(id: number): Task {
    const task = this.tasks.find((item) => item.id === id);

    if (!task) {
      throw new NotFoundException(`Tarea ${id} no encontrada`);
    }

    return task;
  }
}

