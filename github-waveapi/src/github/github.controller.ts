import { Controller, Get, Param, Query } from '@nestjs/common';
import { GithubService } from './github.service';
import { Public } from 'src/auth/publicRoutes/public';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Public()
  // Endpoint para obter informações do usuário
  @Get('user/:username')
  async getUser(@Param('username') username: string) {
    return await this.githubService.getUser(username);
  }

  @Public()
  // Endpoint para obter os repositórios do usuário com paginação
  @Get('user/repos')
  async getUserRepos(
    @Param('username') username: string,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 30,
  ) {
    return await this.githubService.getUserRepos(username, page, perPage);
  }
}
