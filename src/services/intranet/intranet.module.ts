import { Module } from '@nestjs/common';
import { IntranetService } from './intranet.service';
import { IntranetController } from './intranet.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { ServicesModule } from '../services.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { ServicesService } from '../services.service';
import { WidgetModule } from '../widget/widget.module';
import { WidgetService } from '../widget/widget.service';

@Module({
  providers: [PrismaService, IntranetService, ServicesService, WidgetService],
  controllers: [IntranetController],
  imports: [ServicesModule, IntranetModule, PrismaModule, WidgetModule],
  exports: [IntranetService]
})
export class IntranetModule {}
