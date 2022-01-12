import { Controller, Get, Request, UseGuards, Post, Body, Param, BadRequestException, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { decodeHeader } from 'src/utils';
import { CreateServiceDto } from '../dto/create-service.dto';
import { ServicesService } from '../services.service';
import { IntranetService } from './intranet.service';
import { services } from '../../utils';
import { CreateWidgetDto } from '../dto/create-widget.dto';
import { ApiSecurity, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { WidgetService } from '../widget/widget.service';
import { intraWidget } from './config/intra-widgets';

@Controller('services/intranet')
@UseGuards(AuthGuard('basic'))
@ApiSecurity('basic')
@ApiTags("Intranet Service")
export class IntranetController {
    constructor(
        private readonly servicesService: ServicesService,
        private readonly intranetService: IntranetService,
        private readonly widgetService: WidgetService,
    ) {}
    
    @Post('/register')
    @ApiOperation({
        summary: 'Intranet Service registration',
        description: 'You must register to the service before being authorized to do any thing',  
    })
    registerToIntra(@Request() req: Request) {
        const username = decodeHeader(req.headers);
        return this.servicesService.registerToService(username , services.intranet);
    }

    @Post('/unregister')
    unRegisterToIntra(@Request() req: Request) {
        const username = decodeHeader(req.headers);
        
        return this.servicesService.unRegisterToService(username , services.intranet);
    }

    @Get('/widgets/')
    @ApiOperation({
        summary: 'Intranet Service unregistration',
        description:'You can unregister to a service too'
    })
    findWidgets(@Request() req : Request) {
        const username = decodeHeader(req.headers);
        return this.intranetService.getWidgets(username);    
    }

    @Post('/widgets/me')
    @ApiParam({
        name: 'params',
        type: 'string',
        description: 'Your intranet autologin'
        
    })
    createMeWidget (@Request() req : Request, @Body() body: CreateWidgetDto) {
        if (body.params.startsWith("https://intra.epitech.eu/", 0))
            body.params = body.params.replace("https://intra.epitech.eu/", '');        
        
        if (!body.params.startsWith('auth'))
            throw new BadRequestException('This autologin is not sexy');
        const username = decodeHeader(req.headers);
        return this.intranetService.createMeWidget(username, body.params);    
    }

    @Get('/widgets/me')
    findMeWidgets(@Request() req : Request) {
        const username = decodeHeader(req.headers);
        return this.intranetService.getMeWidgets(username);    
    }

    @Get('/widgets/me/:id')
    findMeWidgetById(@Request() req : Request, @Param('id') id: string) {
        const username = decodeHeader(req.headers);
        return this.intranetService.getMeWidgetById(username, +id);    
    }

    @Post('widgets/plans')
    @ApiParam({
        name: 'params',
        type: 'string',
        description: 'Your intranet autologin'
        
    })
    createPlansWidget(@Request() req : Request, @Body() body: CreateWidgetDto) {
        const username = decodeHeader(req.headers);
        if (body.params.startsWith("https://intra.epitech.eu/", 0))
            body.params = body.params.replace("https://intra.epitech.eu/", '');        
        
        if (!body.params.startsWith('auth'))
            throw new BadRequestException('This autologin is not sexy');
        return this.intranetService.createPlanWidget(username, body.params);    
    }

    @Get('widgets/plans')
    findPlans(@Request() req : Request) {
        const username = decodeHeader(req.headers);
        
        return this.intranetService.getPlansWidgets(username);    
    }

    @Get('widgets/plans/:id')
    findPlansById(@Request() req : Request, @Param('id') id: string) {
        
        const username = decodeHeader(req.headers);
        return this.intranetService.getPlansWidgetById(username, +id);    
    }

    @Get('widgets/available')
    findAvalableWidget(@Request() req : Request) {
        return intraWidget;    
    }

    @Delete('/widgets/me/:id')
    deleteMeWidget(@Request() req : Request, @Param('id') id: string) {
        return this.widgetService.deleteWidget(+id);
    }

    @Delete('/widgets/plans/:id')
    deletePlansWidget(@Request() req : Request, @Param('id') id: string) {
        return this.widgetService.deleteWidget(+id);
    }
}
