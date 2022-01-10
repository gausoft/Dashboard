import { Injectable } from '@nestjs/common';
import { Widget } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ServicesService } from '../services.service';
import { WidgetParams } from './widget.interface';

@Injectable()
export class WidgetService {

    constructor(private readonly prismaService: PrismaService, private readonly serviceService: ServicesService) { }

    async createWidget(params: WidgetParams) {
        const user = await this.serviceService.retrieveUser(params.username);
        const service = await this.serviceService.retrieveUserService(user.id, params.serviceName);

        return this.prismaService.widget.create({
            data: {
                userId: user.id,
                serviceId: service.id,
                params: params.params,
                description: params.description,
                name: params.widgetName,
            }
        });

    }

    async deleteWidget(id: number) {
        return this.prismaService.widget.delete(
            {
                where: {
                    id: id,
                }
            }
        );
    }

    async getUserWidgets(params: WidgetParams): Promise<Widget[]> {
        const user = await this.serviceService.retrieveUser(params.username);
        const service = await this.serviceService.retrieveUserService(user.id, params.serviceName);
        return this.prismaService.widget.findMany({
            where: {
                userId: user.id,
                serviceId: service.id,
                name: params.widgetName,
            }
        });


    }

    async getUserWidgetById(params: WidgetParams) {
        const user = await this.serviceService.retrieveUser(params.username);
        const service = await this.serviceService.retrieveUserService(user.id, params.serviceName);

        return this.prismaService.widget.findFirst({
            where: {
                userId: user.id,
                serviceId: service.id,
                name: params.widgetName,
                id: params.widgetId,
            }
        });
    }

    async getWidgets(params: WidgetParams) {
        const user = await this.serviceService.retrieveUser(params.username);
        const service = await this.serviceService.retrieveUserService(user.id, params.serviceName);

        return this.prismaService.widget.findMany({
            where: {
                userId: user.id,
                serviceId: service.id,
            }
        });
    }
}
