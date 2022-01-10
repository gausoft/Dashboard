import { Body, Controller, Get, Post, Request, UseGuards, Param, Delete, BadRequestException } from '@nestjs/common';
import { CreateServiceDto } from '../dto/create-service.dto';
import { decodeHeader, services } from '../../utils';
import { ServicesService } from '../services.service';
import { GithubService } from './github.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateWidgetDto } from '../dto/create-widget.dto';
import { githubWidget } from './config/github-widget';
import { WidgetService } from '../widget/widget.service';

@Controller('services/github')
@UseGuards(AuthGuard('basic'))
@ApiSecurity('basic')
@ApiTags("Github Service")
export class GithubController {
    constructor(
        private readonly servicesService: ServicesService,
        private readonly githubService: GithubService,
        private readonly widgetService: WidgetService,
    ) {}

    @Post("/register")
    registerToGithub(@Request() req: Request, @Body() service : CreateServiceDto) {
        const username = decodeHeader(req.headers);
        return this.servicesService.registerToService(username , services.github);
    }

    @Post('/unregister')
    unRegisterToGithub(@Request() req: Request) {
        const username = decodeHeader(req.headers);
        return this.servicesService.unRegisterToService(username , services.github);
    }

    @Get('/widgets/')
    findWidgets(@Request() req : Request) {
        const username = decodeHeader(req.headers);
        return this.githubService.getWidgets(username);
    }

    @Post('/widgets/repos')
    @ApiParam({
        name: 'params',
        type: 'string',
        description: 'Your github username'
        
    })
    createReposWidget (@Request() req : Request, @Body() body: CreateWidgetDto) {
        const username = decodeHeader(req.headers);
        return this.githubService.createReposWidget(username, body.params);    
    }

    @Get('/widgets/repos')
    findReposWidgets(@Request() req : Request) {
        const username = decodeHeader(req.headers);
        return this.githubService.getRepos(username);
    }

    @Get('/widgets/repos/:id')
    findReposWidgetById(@Request() req : Request, @Param('id') id: string) {
        const username = decodeHeader(req.headers);
        return this.githubService.getReposById(username, +id);
    }

    @Post('widgets/pushes')
    @ApiParam({
        name: 'params',
        type: 'string',
        description: 'The url to the projects'
        
    })
    createPushesWidget(@Request() req : Request, @Body() body: CreateWidgetDto) {
        const username = decodeHeader(req.headers);
        if (body.params.startsWith('https://github.com/'))
            body.params = body.params.replace('https://github.com/', '');
        else 
            throw new BadRequestException('params is not an allowed link')
        return this.githubService.createPushesWidget(username, body.params);    
    }

    @Get('widgets/pushes')
    findPushes(@Request() req : Request) {
        const username = decodeHeader(req.headers);
        return this.githubService.getPushes(username);    
    }

    @Get('widgets/pushes/:id')
    findPushesById(@Request() req : Request, @Param('id') id: string) {
        const username = decodeHeader(req.headers);
        return this.githubService.getPushesById(username, +id);    
    }

    @Post('/widgets/events')
    @ApiParam({
        name: 'params',
        type: 'string',
        description: 'Your github username'
        
    })
    createEventsWidget (@Request() req : Request, @Body() body: CreateWidgetDto) {
        const username = decodeHeader(req.headers);
        return this.githubService.createReposWidget(username, body.params);    
    }

    @Get('widgets/events')
    findEvents(@Request() req : Request) {
        const username = decodeHeader(req.headers);
        return this.githubService.getEvents(username);    
    }

    @Get('widgets/events/:id')
    findEventsById(@Request() req : Request, @Param('id') id: string) {
        const username = decodeHeader(req.headers);
        return this.githubService.getEventsById(username, +id);    
    }

    @Get('widgets/available')
    findAvalableWidget() {
        return githubWidget;    
    }

    @Delete('/widgets/repos/:id')
    deleteReposWidget(@Request() req : Request, @Param('id') id: string) {
        return this.widgetService.deleteWidget(+id);
    }

    @Delete('/widgets/pushes/:id')
    deletePushesWidget(@Request() req : Request, @Param('id') id: string) {
        return this.widgetService.deleteWidget(+id);
    }

    @Delete('/widgets/events/:id')
    deleteEventsWidget(@Request() req : Request, @Param('id') id: string) {
        return this.widgetService.deleteWidget(+id);
    }
}
