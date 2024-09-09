import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import type { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID, // Pegue do arquivo de variáveis de ambiente
      clientSecret: process.env.GITHUB_CLIENT_SECRET, // Pegue do arquivo de variáveis de ambiente
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    try {
      const user = await this.authService.validateOAuthLogin(profile);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
