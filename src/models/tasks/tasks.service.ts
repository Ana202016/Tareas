import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-cat.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Task } from '@prisma/client';
//import { UpdateTaskDto } from './dto/update-task.dto';


@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService) {}
    /**
     * 
     * @returns 
     */
    async getTasks(): Promise<Task[]> {
      return this.prisma.task.findMany();
    }
  
/**
 * Crear tarea
 * @param task 
 * @returns 
 */

async createTask(dto: CreateTaskDto): Promise<Task> {
  // Convert DTO to Prisma TaskCreateInput if needed
  return this.prisma.task.create({
      data:dto,
  });
}

    async updateTask(id: number, task:Prisma.TaskUpdateInput): Promise<Task> {
      await this.getTask(id);
        return this.prisma.task.update({
          data: task,
          where:{
            id
          }
        });
      }

  
    async deleteTask(id: number): Promise< Task > {
       await this.getTask(id);
       return this.prisma.task.delete({
        where: {
          id
        }
       });

      }
    

  async getTask(id: number): Promise <Task> {
    
    const task = await this.prisma.task.findUnique({
      where: {
        id
      }
    });

    if (!task) {
      throw new NotFoundException(`Tarea ${id} no encontrada`);
    }

    return task;
  }
}

