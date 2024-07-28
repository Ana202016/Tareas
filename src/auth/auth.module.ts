import { Module } from '@nestjs/common';
import { UsersModule } from '../models/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../models/users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';


@Module({
  imports: [
    UsersModule,
    PassportModule,
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
