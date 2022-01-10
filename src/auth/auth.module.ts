import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { BasicStrategy } from './auth.strategy';

@Module({
  providers: [AuthService, UsersService, PrismaService, BasicStrategy,],
  imports: []

})
export class AuthModule { }
