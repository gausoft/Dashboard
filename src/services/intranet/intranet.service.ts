import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { services } from 'src/utils';
import { IntraUser } from './models/intra_user';
import { Plan } from './models/planning';
import { Widget } from '@prisma/client';
import { intraWidget } from './config/intra-widgets';
import { WidgetService } from '../widget/widget.service';
import { ServicesService } from '../services.service';
import { CreateWidgetDto } from '../dto/create-widget.dto';

@Injectable()
export class IntranetService {
    private readonly axiosInstance: AxiosInstance;

    constructor(
        private readonly widgetService: WidgetService,
    ) {
        this.axiosInstance = axios.create({
            baseURL: 'https://intra.epitech.eu/',
        })
    }

    async getWidgets(username: string): Promise<Widget[]> {
        
        return this.widgetService.getWidgets(
            {
             username: username,
             serviceName: services.intranet,   
            }
        );
    }

    async createMeWidget(username: string, params: string): Promise<Widget> {

        return this.widgetService.createWidget(
            {
                username: username,
                serviceName: services.intranet,
                widgetName: intraWidget.me.name,
                description: intraWidget.me.description,
                params: params,
            }

        );
    }

    async createPlanWidget(username: string, params: string): Promise<Widget> {

        return this.widgetService.createWidget(
            {
                username: username,
                serviceName: services.intranet,
                widgetName: intraWidget.plans.name,
                description: intraWidget.plans.description,
                params: params,
            }
        );
    }

    async getMeWidgets(username: string): Promise<Widget[]> {
        
        return this.widgetService.getUserWidgets({
            username: username,
            serviceName: services.intranet,
            widgetName: intraWidget.me.name,
            
        });
    }

    async getMeWidgetById(username: string, id: number): Promise<CreateWidgetDto> {
        const widget = await this.widgetService.getUserWidgetById({
            username: username,
            serviceName: services.intranet,
            widgetName: intraWidget.me.name,
            widgetId: id,
        });

        const infos = (await this.axiosInstance.get(widget.params + '/user?format=json')).data;

        const userInfos: IntraUser = {
            email: infos.login,
            name: infos.title,
            pictureUrl: 'https://intra.epitech.eu/' + widget.params + infos.picture,
            location: infos.groups[0].title,
            course: infos.course_code,
            school: infos.school_code,
            gpa: infos.gpa[0].gpa,
            credit: infos.credits,
        };
        
        return {
            ...widget,
            data: userInfos,   
        };
    }

    async getPlansWidgets(username: string): Promise<Widget[]> {
        return this.widgetService.getUserWidgets({
            username: username,
            serviceName: services.intranet,
            widgetName: intraWidget.plans.name,
        });
    }

    async getPlansWidgetById(username: string, id: number): Promise<CreateWidgetDto> {
        const widget = await this.widgetService.getUserWidgetById({
            username: username,
            serviceName: services.intranet,
            widgetName: intraWidget.plans.name,
            widgetId: id,
        });

        let infos: Plan[] = (await this.axiosInstance.get(widget.params + '/planning/load?format=json')).data;

        infos = infos.slice(0, 5);

        let plans: Plan[] = [];

        infos.forEach(element => {
            plans.push({
                scolaryear: element.scolaryear,
                codemodule: element.codemodule,
                semester: element.semester,
                titlemodule: element.titlemodule,
                start: element.start,
                end: element.end,
                type_title: element.type_title,
                nb_hours: element.nb_hours,
            });
        });


        return {
            ...widget,
            data: plans,
        };
    }
}
