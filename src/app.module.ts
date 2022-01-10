import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { IntranetModule } from './services/intranet/intranet.module';
import { YoutubeModule } from './services/youtube/youtube.module';
import { GithubModule } from './services/github/github.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [AuthModule, PrismaModule, ServicesModule, UsersModule, IntranetModule, YoutubeModule, GithubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
