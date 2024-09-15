import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { GithubModule } from './github/github.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, PrismaModule, GithubModule],
  controllers: [],
  providers: [PrismaModule],
})
export class AppModule {}
