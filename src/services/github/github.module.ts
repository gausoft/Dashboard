import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { ServicesService } from '../services.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ServicesModule } from '../services.module';
import { WidgetModule } from '../widget/widget.module';
import { WidgetService } from '../widget/widget.service';

@Module({
  controllers: [GithubController],
  providers: [GithubService, ServicesService, WidgetService],
  imports: [PrismaModule, ServicesModule, WidgetModule],
  exports: [GithubService]
})
export class GithubModule {}
