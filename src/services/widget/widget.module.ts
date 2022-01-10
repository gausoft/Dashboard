import { Module } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { ServicesModule } from '../services.module';
import { ServicesService } from '../services.service';

@Module({
  providers: [WidgetService, PrismaService, ServicesService],
  exports: [WidgetService],
  imports: [PrismaModule, ServicesModule]
})
export class WidgetModule {}
