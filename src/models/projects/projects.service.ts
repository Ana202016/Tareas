import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';


import { Prisma, Project } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ProjectsService {

//instancia de prisma
  constructor(private prisma: PrismaService) {}

 /**
  * Método que registra un nuevo proyecto
  * @param data : datos del proyecto a registrar
  * @returns proyecto registrado
  */
  async create(data: Prisma.ProjectCreateInput): Promise < Project> {
    return this.prisma.project.create({
      data,
    })
  }

  /**
   * 
   * @returns 
   */
  async findAll() : Promise<Project []> {
    return this.prisma.project.findMany();
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where :{
        id
      }
    });
    if(!project){
      throw new NotAcceptableException ('Proyecto no encontrado');
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    await this.findOne(id);
  
    return this.prisma.project.update({
      data: {
        name: updateProjectDto.name,
        description: updateProjectDto.description,
      },
      where: {
        id
      }
    });
  }

  async remove(id: number) {
    await this.findOne(id);// validacion del que el proyecto exista

    return this.prisma.project.delete({
      where :{
        id
      }
    });
  }
}
