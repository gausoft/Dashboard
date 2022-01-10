import { PrismaClient, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class CreateServiceDto  implements Prisma.ServiceUncheckedCreateInput{
    id?: number;

    @ApiProperty()
    name: string;
    
    userId: number;
    
    @ApiProperty()
    is_registred?: boolean;
    
    update_at?: string | Date;
}
