/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma, type User } from 'prisma/prisma-client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Valida o usuário baseado no email e senha
  async validateUser(email: string, password: string): Promise<any> {
    return await this.usersService.findOne(email, password);
  }

  // Realiza o signup de novos usuários
  async signup(createUserDto: Prisma.UserCreateInput) {
    try {
      return await this.usersService.register(createUserDto);
    } catch (err) {
      throw new Error(`Error creating ${err} user ${err.message}`);
    }
  }

  // Realiza o login de usuários
  async signin(email: string, password: string) {
    try {
      const user = (await this.validateUser(
        email,
        password,
      )) as Prisma.UserCreateInput;
      const payload = { email: user.email, sub: user.id, role: user.role };
      return {
        user: {
          id: user.id,
          username: user.name,
          email: user.email,
          role: user.role,
        },
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new Error(`Error logging in ${error} user ${error.message}`);
    }
  }
  async findOrCreateUser(userData: {
    email: string;
    username: string;
    githubId: string;
    image?: string;
  }): Promise<Omit<User, 'password'>> {
    const { email, username, githubId, image } = userData;

    // Tenta encontrar o usuário no banco de dados
    let user = await this.usersService.findByEmail(email);

    // Se o usuário não for encontrado, cria um novo usuário
    if (!user) {
      const newUser: Prisma.UserCreateInput = {
        email,
        name: username,
        password: githubId, // Utilize githubId ou um token como senha
        image: image || '',
        role: 'user',
      };

      user = await this.usersService.register(newUser);
    }

    // Remove a propriedade 'password' antes de retornar o usuário
    const { password, ...userWithoutPassword } = user as User;
    return userWithoutPassword;
  }

  // Gera o token JWT para o usuário após o login pelo GitHub
  async githubLogin(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      user: {
        id: user.id,
        username: user.name,
        email: user.email,
        role: user.role,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
  async signinPayloadToken(payload: any) {
    return this.jwtService.sign(payload);
  }
}
