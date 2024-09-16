/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Prisma } from 'prisma/prisma-client';
import { Public } from './publicRoutes/public';
import { AuthGuard } from '@nestjs/passport';
import type { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('/signup')
  @ApiOperation({
    summary: 'Signup as a user',
  })
  @ApiBody({
    description: 'SignUp creation payload',
    schema: {
      example: {
        name: 'Jhon Doe',
        email: 'email@email.com',
        password: 'password',
      },
    },
  })
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.authService.signup(createUserDto);
  }

  @ApiOperation({
    summary: 'Login as a user',
  })
  @ApiBody({
    description: 'SignUp creation payload',
    schema: {
      example: {
        email: 'email@email.com',
        password: 'password',
      },
    },
  })
  @Public()
  @Post('/signin')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.authService.signin(email, password);
  }

  @Public()
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    console.log('Passei AQUI');
    // Esse endpoint redireciona o usuário para a página de login do GitHub
  }

  @Public()
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req: any, @Res() res: any) {
    const { user } = req;
    if (!user) {
      res.redirect('/github');
      return;
    }
    const userData = {
      email: user.email,
      username: user.username,
      githubId: user.githubId,
      image: user.image,
    };

    try {
      const userFromDb = await this.authService.findOrCreateUser(userData);

      // Gera o token JWT para o usuário
      const payload = {
        email: userFromDb.email,
        sub: userFromDb.id,
        role: userFromDb.role,
      };
      console.log('PAYLOAD', payload);
      const accessToken = await this.authService.signinPayloadToken(payload);
      console.log('acesstoken', accessToken);
      // Redireciona o usuário para a página inicial com o token JWT
      res.redirect(`/?access_token=${accessToken}`);
    } catch (error) {
      res.redirect('/login');
    }
  }
}
