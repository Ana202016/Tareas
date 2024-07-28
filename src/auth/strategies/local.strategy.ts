import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(username, password);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    // Asegúrate de que el objeto user contenga todas las propiedades necesarias
    if (!user.id || !user.active) {
      throw new UnauthorizedException('Faltan propiedades en el objeto usuario');
    }

    // Devolver el usuario completo
    return user;
  }
}

