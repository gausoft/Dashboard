import { Injectable } from '@nestjs/common';
import { WidgetService } from '../widget/widget.service';
import { services } from '../../utils';
import { twitterWidget } from './config/twitterWidget';
import { CreateWidgetDto } from '../dto/create-widget.dto';
import { CreateTokenDto } from '../dto/create-token.dto';

@Injectable()
export class TwitterService {

    constructor(
        private readonly widgetService: WidgetService,
    ) {
    }
    
    async getWidgets(username: string) {
        return this.widgetService.getWidgets(
            {
             username: username,
             serviceName: services.twitter,   
            }
        );
    }

    async createTlWidget(username: string, token: CreateTokenDto) {
        const widget = this.widgetService.createWidget(
            {
                username: username,
                serviceName: services.twitter,
                widgetName: twitterWidget.tl.name,
                description: twitterWidget.tl.description,
                params: '',
            }
        );

        
        return ;
    }
    
    getTlWidgets(username: string) {
        return this.widgetService.getUserWidgets({
            username: username,
            serviceName: services.twitter,
            widgetName: twitterWidget.tl.name,
            
        });
    }

    async getTlWidgetById(username: string, id: number) :  Promise<CreateWidgetDto> {
        const widget = await this.widgetService.getUserWidgetById({
            username: username,
            serviceName: services.twitter,
            widgetName: twitterWidget.tl.name,
            widgetId: id,
        });

        

        return {
            ...widget,
            data: {},
        }
    }
}
