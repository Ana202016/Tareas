import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/models/projects/users/users.service';


@Injectable()
export class AuthService {

    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
    ) {}


    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.getUser(username);

        // ToDo: validar cntraseña cifrada
        if (user && user.password === pass) {
          return user;
        }
        return null;
      }

      //iniciar 
      async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        const users = {
          username:user.username,
          email: user.email,
          name:user.name 
        };
        return {
          users,
          access_token: this.jwtService.sign(payload),
        };
      }

      private generateToken(user: any) {
        const payload = { sub: user.id, email: user.email };
        return {
          access_token: this.jwtService.sign(payload),
        };
      } 
}
