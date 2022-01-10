import { PrismaClient, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWidgetDto  implements Prisma.WidgetUncheckedCreateInput{
    @ApiProperty({required: false})
    id?: number;

    @ApiProperty({required: false})
    name?: string;

    @ApiProperty()
    params: string;


    @ApiProperty({required: false})
    userId?: number;

    @ApiProperty({required: false})
    serviceId?: number;

    @ApiProperty({required: false})
    update_at?: string | Date;

    @ApiProperty({required: false})
    data?: any
    
}
