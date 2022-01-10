import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { decodeHeader } from '../utils';
import { ServicesService } from './services.service';

@Controller('services')
@ApiSecurity('basic')
@UseGuards(AuthGuard('basic'))
@ApiTags("Services")
export class ServicesController {

    constructor(private readonly servicesService: ServicesService) {}

    @Get('/')
    retrieveUserServices(@Request() request: Request) {
        const username = decodeHeader(request.headers);
        return this.servicesService.retrieveServices();
    }

    @Get('/registered')
    retrieveUserRegisteredServices(@Request() request: Request) {
        const username = decodeHeader(request.headers);
        return this.servicesService.retrieveRegisteredServices(username);
    }

}
