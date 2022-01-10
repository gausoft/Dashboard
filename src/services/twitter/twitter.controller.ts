import { Controller, UseGuards, Post, Request, Body, Get, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity } from '@nestjs/swagger';
import { ServicesService } from '../services.service';
import { TwitterService } from './twitter.service';
import { decodeHeader, services } from '../../utils';
import { CreateServiceDto } from '../dto/create-service.dto';
import { CreateTokenDto } from '../dto/create-token.dto';
import { WidgetService } from '../widget/widget.service';

@Controller('services/twitter')
@UseGuards(AuthGuard('basic'))
@ApiSecurity('basic')
export class TwitterController {
    constructor(
        private readonly servicesService: ServicesService,
        private readonly twitterService: TwitterService,
        private readonly widgetService: WidgetService,
    ) {}


    @Post('/register')
    registerToYoutube(@Request() req: Request, @Body() service : CreateServiceDto) {
        const username = decodeHeader(req.headers);
        return this.servicesService.registerToService(username , services.twitter);
    }

    @Post('/unregister')
    unRegisterToYoutube(@Request() req: Request) {
        const username = decodeHeader(req.headers);
        return this.servicesService.unRegisterToService(username , services.twitter);
    }

    @Get('/widgets/')
    findWidgets(@Request() req : Request) {
        const username = decodeHeader(req.headers);
        return this.twitterService.getWidgets(username);    
    }

    @Post('/widgets/tl')
    createTlWidget(@Request() req : Request, @Body() body: CreateTokenDto) {
        const username = decodeHeader(req.headers);
        return this.twitterService.createTlWidget(username, body);    
    }

    @Get('/widgets/tl')
    findTlWidgets(@Request() req : Request) {
        const username = decodeHeader(req.headers);
        return this.twitterService.getTlWidgets(username);    
    }

    @Get('/widgets/tl/:id')
    findTlWidgetById(@Request() req : Request, @Param('id') id: string) {
        const username = decodeHeader(req.headers);
        return this.twitterService.getTlWidgetById(username, +id);    
    }

    @Delete('/widgets/tl/:id')
    deleteTlWidget(@Request() req : Request, @Param('id') id: string) {
        return this.widgetService.deleteWidget(+id);
    }
}
