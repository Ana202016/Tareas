import { Controller, Post, Body, UseGuards, Get, Request, HttpCode, HttpStatus } from "@nestjs/common";
import { UsersService } from "../models/users/users.service";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./strategies/guards/jwt-auth.guard";
import { LocalAuthGuard } from "./strategies/guards/local-auth.guard";
import { CreateUserDto } from "../models/users/dto/create-user.dto";
import { Public } from "@prisma/client/runtime/library";


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
    @HttpCode(HttpStatus.OK)
    async login(@Request() req) {
      console.log(req.body)
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
    return this.userService.get();
  }
/*
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
  //  return req.user;
  return this.authService.login(req.user);
  }*/

}
