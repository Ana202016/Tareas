import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/guards/local-auth.guard';
import { JwtAuthGuard } from './strategies/guards/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { create } from 'domain';
import { Public } from '@prisma/client/runtime/library';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private readonly userService: UsersService
  ) {}

    //POST: /login ->> /auth/login
   
    @Post('register')
    async register(@Body() CreateUserDto: CreateUserDto) {
      return this.userService.create(CreateUserDto);
    }

  
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.body);
    }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
  //  console.log(req, req.user);
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async findAll() {
    return this.userService.getUs();
  }
/*
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
  //  return req.user;
  return this.authService.login(req.user);
  }*/

}
