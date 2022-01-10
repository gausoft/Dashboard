import { Module } from '@nestjs/common';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ServicesModule } from '../services.module';
import { ServicesService } from '../services.service';
import { WidgetModule } from '../widget/widget.module';
import { WidgetService } from '../widget/widget.service';

@Module({
  controllers: [YoutubeController],
  providers: [YoutubeService, ServicesService, WidgetService],
  imports: [ServicesModule, WidgetModule],
  exports: [YoutubeService]
})
export class YoutubeModule {}
