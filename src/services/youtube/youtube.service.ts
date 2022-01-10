import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import Youtube, { YoutubeChannel, YoutubePlaylistSearch, YoutubeVideoSearch, YoutubeVideoSearchItem } from 'youtube.ts';
import { services } from '../../utils';
import { YoutubeCredentials } from './config/config';
import { WidgetService } from '../widget/widget.service';
import { youtubeWidget } from './config/youtube-widget';
import { CreateWidgetDto } from '../dto/create-widget.dto';
import { Video } from './models/video';

@Injectable()
export class YoutubeService {
    private readonly youtubeApi : Youtube;

    constructor(
        private readonly widgetService: WidgetService,
    ) {
        this.youtubeApi = new Youtube(YoutubeCredentials.apiKey) 
    }
    
    async getWidgets(username: string) {
        return this.widgetService.getWidgets(
            {
             username: username,
             serviceName: services.youtube,   
            }
        );
    }

    createMoodWidget(username: string, params: string) {
        return this.widgetService.createWidget(
            {
                username: username,
                serviceName: services.youtube,
                widgetName: youtubeWidget.mood.name,
                description: youtubeWidget.mood.description,
                params: params,
            }
        );
    }
    
    getMoodWidgets(username: string) {
        return this.widgetService.getUserWidgets({
            username: username,
            serviceName: services.youtube,
            widgetName: youtubeWidget.mood.name,
            
        });
    }

    async getMoodWidgetById(username: string, id: number) :  Promise<CreateWidgetDto> {
        const widget = await this.widgetService.getUserWidgetById({
            username: username,
            serviceName: services.youtube,
            widgetName: youtubeWidget.mood.name,
            widgetId: id,
        });

        let infos = (await this.youtubeApi.videos.search({q: widget.params, maxResults: 5})).items;
        let videos :Video[] = [];

        infos.forEach(element => {
            videos.push({
                url: 'https://www.youtube.com/watch?v=' + element.id.videoId,
                title: element.snippet.title,
                description: element.snippet.description,
                channelTitle: element.snippet.channelTitle,
                thumbnails: element.snippet.thumbnails.medium.url,
            })
        });

        return {
            ...widget,
            data: videos,
        }
    }

    createFavoriteWidget(username: string, params: string) {
        return this.widgetService.createWidget(
            {
                username: username,
                serviceName: services.youtube,
                widgetName: youtubeWidget.favorite.name,
                description: youtubeWidget.favorite.description,
                params: params,
            }
        );
    }
    
    getFavoriteWidgets(username: string) {
        return this.widgetService.getUserWidgets({
            username: username,
            serviceName: services.youtube,
            widgetName: youtubeWidget.favorite.name,
            
        });
    }

    async getFavoriteWidgetById(username: string, id: number) :  Promise<CreateWidgetDto> {
        const widget = await this.widgetService.getUserWidgetById({
            username: username,
            serviceName: services.youtube,
            widgetName: youtubeWidget.favorite.name,
            widgetId: id,
        });

        const channel = await this.youtubeApi.channels.get(widget.params);
        const infos = (await this.youtubeApi.videos.search({maxResults: 1, channelId: channel.id, order: 'date'})).items[0];

        const video :Video = {
            url: 'https://www.youtube.com/watch?v=' + infos.id.videoId,
                title: infos.snippet.title,
                description: infos.snippet.description,
                channelTitle: infos.snippet.channelTitle,
                thumbnails: infos.snippet.thumbnails.medium.url,   
        };

        return {
            ...widget,
            data: video,
        }
    }
    

}
