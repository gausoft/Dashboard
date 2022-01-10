import { Injectable, BadRequestException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { services } from '../../utils';
import { WidgetService } from '../widget/widget.service';
import { Widget } from '@prisma/client';
import { githubWidget } from './config/github-widget';
import { CreateWidgetDto } from '../dto/create-widget.dto';
import { Repo } from './models/repos';
import { Push } from './models/pushes';
import { Event } from './models/events';


@Injectable()
export class GithubService {
    private readonly githubApi: AxiosInstance

    constructor(
        private readonly widgetService: WidgetService,
    ) {
        this.githubApi = axios.create({
            baseURL: 'https://api.github.com/',
        })
    }

    async createReposWidget(username: string, params: string): Promise<Widget> {
        return this.widgetService.createWidget(
            {
                username: username,
                serviceName: services.github,
                widgetName: githubWidget.repos.name,
                description: githubWidget.repos.description,
                params: params,
            }

        );
    }

    async createPushesWidget(username: string, params: string): Promise<Widget> {
        return this.widgetService.createWidget(
            {
                username: username,
                serviceName: services.github,
                widgetName: githubWidget.pushes.name,
                description: githubWidget.pushes.description,
                params: params,
            }

        );
    }

    async createEventsWidget(username: string, params: string): Promise<Widget> {
        return this.widgetService.createWidget(
            {
                username: username,
                serviceName: services.github,
                widgetName: githubWidget.events.name,
                description: githubWidget.events.description,
                params: params,
            }

        );
    }

    async getWidgets(username: string): Promise<Widget[]> {

        return this.widgetService.getWidgets(
            {
                username: username,
                serviceName: services.github,
            }
        );
    }

    async getRepos(username: string) {
        return this.widgetService.getUserWidgets({
            username: username,
            serviceName: services.github,
            widgetName: githubWidget.repos.name,

        });
    }

    async getEvents(username: string) {
        return this.widgetService.getUserWidgets({
            username: username,
            serviceName: services.github,
            widgetName: githubWidget.events.name,

        });
    }

    async getPushes(username: string) {

        return this.widgetService.getUserWidgets({
            username: username,
            serviceName: services.github,
            widgetName: githubWidget.pushes.name,
        });
    }

    async getReposById(username: string, id: number): Promise<CreateWidgetDto> {
        const widget = await this.widgetService.getUserWidgetById({
            username: username,
            serviceName: services.github,
            widgetName: githubWidget.repos.name,
            widgetId: id,
        });

        try {
            let infos = (await this.githubApi.get(`/users/${widget.params}/repos`)).data;

            infos = infos.slice(0, 10);

            let repos: Repo[] = [];

            infos.forEach(element => {
                repos.push({
                    name: element.name,
                    url: element.owner.html_url,
                    language: element.language,
                    topics: element.topics,
                    stargazers_count: element.stargazers_count,
                    updated_at: element.updated_at,
                });
            });
            return {
                ...widget,
                data: repos,
            }
        } catch (error) {
            throw new BadRequestException("The username you give is not correct");
        }

    }

    async getPushesById(username: string, id: number): Promise<CreateWidgetDto> {
        const widget = await this.widgetService.getUserWidgetById({
            username: username,
            serviceName: services.github,
            widgetName: githubWidget.pushes.name,
            widgetId: id,
            //const key = await this.serviceService.retrieveServiceKey(username, services.github);
        });

        try {
            let infos = (await this.githubApi.get(`/repos/${widget.params}/commits`)).data;
            let pushes: Push[] = [];

            infos = infos.slice(0, 10);

            infos.forEach(element => {
                pushes.push({
                    authorName: element.commit.author.name,
                    authorLogin: element.author.name,
                    authorAvatar: element.author.avatar_url,
                    commitMessage: element.commit.message,
                    url: element.html_url,
                });
            });

            return {
                ...widget,
                data: pushes,
            }
        } catch (error) {
            throw new BadRequestException("The repository url you give is not correct");
        }

    }


    async getEventsById(username: string, id: number): Promise<CreateWidgetDto> {
        const widget = await this.widgetService.getUserWidgetById({
            username: username,
            serviceName: services.github,
            widgetName: githubWidget.repos.name,
            widgetId: id,
        });

        try {
            let infos = (await this.githubApi.get(`/users/${widget.params}/events`)).data;

            infos = infos.slice(0, 10);

            let events: Event[] = [];

            infos.forEach(element => {
                events.push({
                    name: element.actor.name,
                    type: element.type,
                    repo: element.repo.name.replace('api.', ''),
                    date: element.created_at,
                    avatarUrl: element.actor.avatar_url,
                });
            });
            return {
                ...widget,
                data: events,
            }
        } catch (error) {
            throw new BadRequestException("The username you give is not correct");
        }

    }

}
