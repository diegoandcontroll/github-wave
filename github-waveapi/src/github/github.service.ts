import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class GithubService {
  private readonly githubApiUserUrl = 'https://api.github.com/users';
  private readonly githubApiReposUrl = 'https://api.github.com/users';

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  // Método para obter informações do usuário
  async getUser(username: string): Promise<any> {
    const cacheKey = `user-${username}`;

    // Tentar obter dados do cache
    const cachedUser = await this.cacheManager.get(cacheKey);
    if (cachedUser) {
      return cachedUser;
    }

    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(`${this.githubApiUserUrl}/${username}`),
      );

      const user = response.data;
      await this.cacheManager.set(cacheKey, user); // Cache por 1 hora
      return user;
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  // Método para obter os repositórios do usuário
  async getUserRepos(
    username: string,
    page: number = 1,
    perPage: number = 6,
  ): Promise<any> {
    const cacheKey = `repos-${username}-${page}-${perPage}`;

    // Tentar obter dados do cache
    const cachedRepos = await this.cacheManager.get(cacheKey);
    if (cachedRepos) {
      return cachedRepos;
    }

    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(
          `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`,
        ),
      );
      const repos = response.data;
      await this.cacheManager.set(cacheKey, repos); // Cache por 1 hora
      return repos;
    } catch (error) {
      throw new HttpException('Repos not found', HttpStatus.NOT_FOUND);
    }
  }
}
