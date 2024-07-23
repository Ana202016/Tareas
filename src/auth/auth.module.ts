import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/models/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/models/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule, PassportModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET || 'SECRET_KEY',
      signOptions: { expiresIn:`60m`},
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    PrismaService,
    UsersService,
    JwtStrategy
      ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
