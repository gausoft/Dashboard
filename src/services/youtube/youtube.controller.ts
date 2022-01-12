import { Body, Controller, Post, Request, Get, Param, UseGuards, BadRequestException, Delete } from '@nestjs/common';
import { decodeHeader, services } from '../../utils';
import { ServicesService } from '../services.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { YoutubeService } from './youtube.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateWidgetDto } from '../dto/create-widget.dto';
import { youtubeWidget } from './config/youtube-widget';
import { WidgetService } from '../widget/widget.service';

@Controller('services/youtube')
@UseGuards(AuthGuard('basic'))
@ApiSecurity('basic')
@ApiTags("Youtube Service")
export class YoutubeController {
    constructor(
        private readonly servicesService: ServicesService,
        private readonly youtubeService: YoutubeService,
        private readonly widgetService: WidgetService,
    ) {}
    
    
    @Post('/register')
    @ApiOperation({
        summary: 'Youtube Service registration',
        description: 'You must register to the service before being authorized to do any thing',  
    })
    registerToYoutube(@Request() req: Request, @Body() service : CreateServiceDto) {
        const username = decodeHeader(req.headers);
        return this.servicesService.registerToService(username , services.youtube);
    }

    @Post('/unregister')
    @ApiOperation({
        summary: 'Youtube Service unregistration',
        description:'You can unregister to a service too'
    })
    unRegisterToYoutube(@Request() req: Request) {
        const username = decodeHeader(req.headers);
        return this.servicesService.unRegisterToService(username , services.youtube);
    }

    @Get('/widgets/')
    @ApiOperation({
        summary: 'Get all available widgets for Youtube Service',
    })
    findWidgets(@Request() req : Request) {
        const username = decodeHeader(req.headers);
        return this.youtubeService.getWidgets(username);    
    }

    @Post('/widgets/mood')
    @ApiParam({
        name: 'params',
        type: 'string',
        description: 'A special keyword with refer to your preference'
        
    })
    createMoodWidget(@Request() req : Request, @Body() body: CreateWidgetDto) {
        const username = decodeHeader(req.headers);
        return this.youtubeService.createMoodWidget(username, body.params);    
    }

    @Get('/widgets/mood')
    findMoodWidgets(@Request() req : Request) {
        const username = decodeHeader(req.headers);
        return this.youtubeService.getMoodWidgets(username);    
    }

    @Get('/widgets/mood/:id')
    findMoodWidgetById(@Request() req : Request, @Param('id') id: string) {
        const username = decodeHeader(req.headers);
        return this.youtubeService.getMoodWidgetById(username, +id);    
    }

    @Post('/widgets/favorite')
    @ApiParam({
        name: 'params',
        type: 'string',
        description: 'A link to your favorite youtube channel'
        
    })
    createFavoriteWidget(@Request() req : Request, @Body() body: CreateWidgetDto) {
        const username = decodeHeader(req.headers);
        console.log(body);
        
        if (!body.params.startsWith('https://www.youtube.com/channel') || !body.params.startsWith('https://www.youtube.com/c'))
            throw new BadRequestException('params is not an allowed link')
        
        return this.youtubeService.createFavoriteWidget(username, body.params);    
    }

    @Get('/widgets/favorite')
    findFavoriteWidgets(@Request() req : Request) {
        const username = decodeHeader(req.headers);
        return this.youtubeService.getFavoriteWidgets(username);    
    }

    @Get('/widgets/favorite/:id')
    findFavoriteWidgetById(@Request() req : Request, @Param('id') id: string) {
        const username = decodeHeader(req.headers);
        return this.youtubeService.getFavoriteWidgetById(username, +id);    
    }

    @Get('widgets/available')
    findAvalableWidget(@Request() req : Request) {
        return youtubeWidget;    
    }

    @Delete('/widgets/favorite/:id')
    deleteFavoriteWidget(@Request() req : Request, @Param('id') id: string) {
        return this.widgetService.deleteWidget(+id);
    }

    @Delete('/widgets/mood/:id')
    deleteMoodWidget(@Request() req : Request, @Param('id') id: string) {
        return this.widgetService.deleteWidget(+id);
    }

}
