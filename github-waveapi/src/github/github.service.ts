/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class GithubService {
  private readonly githubApiUserUrl = 'https://api.github.com/users';
  private readonly githubApiReposUrl = 'https://api.github.com/users';

  constructor(private readonly httpService: HttpService) {}

  // Método para obter informações do usuário
  async getUser(username: string): Promise<any> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(`${this.githubApiUserUrl}/${username}`),
      );

      // Tratar os dados do usuário
      const user = response.data;
      return {
        name: user.name,
        bio: user.bio,
        public_repos: user.public_repos,
      };
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  // Método para obter os repositórios do usuário
  async getUserRepos(
    username: string,
    page: number = 1,
    perPage: number = 30,
  ): Promise<any> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(`${this.githubApiReposUrl}/${username}/repos`, {
          params: { page, per_page: perPage },
        }),
      );

      // Tratar os dados dos repositórios
      const repos = response.data;
      return repos.map((repo) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url, // Adicionando a URL do repositório
      }));
    } catch (error) {
      throw new HttpException('Repos not found', HttpStatus.NOT_FOUND);
    }
  }
}
