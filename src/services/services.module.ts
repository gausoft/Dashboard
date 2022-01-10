import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { WidgetService } from './widget/widget.service';
import { ServicesController } from './services.controller';
import { TwitterModule } from './twitter/twitter.module';


@Module({
  providers: [ServicesService, PrismaService, WidgetService],
  imports: [PrismaModule],
  exports: [ServicesService, PrismaModule],
  controllers: [ServicesController]
})
export class ServicesModule {}
