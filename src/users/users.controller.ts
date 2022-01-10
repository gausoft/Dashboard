import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request, ClassSerializerInterceptor, UseInterceptors, UseGuards, UnauthorizedException, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { query } from 'express';
import { decodeHeader } from '../utils';
import { User } from '@prisma/client';
import { ApiSecurity, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto ,@Req() req :Request) {
    
    return this.usersService.create(user);      
  }

  @Get('/me/infos')
  @UseGuards(AuthGuard('basic'))
  @ApiSecurity('basic')
  @ApiOperation({
    summary: 'Get all the stored information about the authenticate user'
  })
  async getUserInfos(@Request() req: Request): Promise<User> {
    const username = decodeHeader(req.headers);

    const user = await this.usersService.findUserByUsername(username, true);
    delete user.password;
    return user;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('basic'))
  @ApiSecurity('basic')
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    
    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('basic'))
  @ApiSecurity('basic')
  remove(@Param('id') id: string) {
    
    return this.usersService.remove(+id);
  }
}