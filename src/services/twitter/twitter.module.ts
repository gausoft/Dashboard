import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { WidgetModule } from '../widget/widget.module';
import { WidgetService } from '../widget/widget.service';
import { ServicesService } from '../services.service';
import { ServicesModule } from '../services.module';

@Module({
  providers: [TwitterService, WidgetService, ServicesService],
  controllers: [TwitterController],
  imports: [WidgetModule, ServicesModule],
  exports: [TwitterService]
})
export class TwitterModule {}
