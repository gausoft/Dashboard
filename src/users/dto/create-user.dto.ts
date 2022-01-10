import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
    
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
    
    created_at?: string | Date;
}
