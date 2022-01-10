import { Prisma } from '@prisma/client';

export class CreateTokenDto implements Prisma.TokenUncheckedCreateInput {
    id?: number;
    accessToken: string;
    refreshToken: string;
    expires: number;
    widgetId?: number;
    update_at?: string | Date;
}