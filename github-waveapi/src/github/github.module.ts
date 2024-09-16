import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 3600,
      max: 100,
    }),
  ],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
