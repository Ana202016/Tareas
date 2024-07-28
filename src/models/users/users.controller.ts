import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

     //Get: /users/ (index)
@Get()
  async getUsers(){
         return this.userService.get();       
     }
    
     //POST: /users/ (crear una tarea)
@Post()
  async register(@Body() createUser: CreateUserDto) {
    return this.userService.createUser({ ...createUser});
  }
}
