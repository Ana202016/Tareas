import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {

    //instancia de prisma service
    constructor(private prisma: PrismaService) {}
    
    //mostrar todos los usuarios
    async getUs(): Promise<User[]> {
      return this.prisma.user.findMany();
    }

    //método para obtener un usuario
    //obtener u usuario por email y contraseña
    async getUser(email: string): Promise <User> {
    
        const user = await this.prisma.user.findUnique({
          where: {
            email,
            active:true, //solo usuarios activos
          }
        });
    
      /*
      evitar excepcion para retornar status 401 con passport  
      if (!user) {
          throw new NotFoundException(`Usuario no encontrada`);
        }*/
    
        return user;
      }

      //método para registrar usuario 
      //por ahora no cifrar contraseña

      async createUser(user: Prisma.UserCreateInput): Promise <User> {
        console.log("Usuario creado exitosamennte");
        return this.prisma.user.create({
          data: user
        });
      }

      async create (createUserDto: CreateUserDto): Promise <User>{
        const user = await this.prisma.user.create({
          data: {
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
            active: true,
          },
        });
        return user;
    
      }

}
