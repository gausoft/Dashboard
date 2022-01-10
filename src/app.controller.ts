import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users/users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags("Base")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/about.json')
  getAboutFile() {
    return this.appService.getAboutJson();
  }
}
