/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role, type User } from 'prisma/prisma-client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  // async register(
  //   createUserDto: Prisma.UserCreateInput,
  // ): Promise<Omit<User, 'password'>> {
  //   try {
  //     if (createUserDto.password) {
  //       createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
  //     }

  //     createUserDto.role = Role.user;

  //     const user = await this.prisma.user.create({ data: createUserDto });
  //     const { password, ...rest } = user;
  //     return rest;
  //   } catch (err) {
  //     throw new Error(`Error creating user: ${err.message}`);
  //   }
  // }
  async findOne(email: string, password: string) {
    try {
      const user = await this.prisma.user.findFirst({ where: { email } });
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        return user;
      } else {
        throw new Error(`User not found`);
      }
    } catch (err) {
      throw new Error(`Error finding ${err} user ${err.message}`);
    }
  }
  async getAll() {
    return await this.prisma.user.findMany({
      where: { role: 'user' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        updatedAt: true,
        createdAt: true,
      },
    });
  }
  async findByEmail(email: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  // Método para registrar um novo usuário
  async register(
    createUserDto: Prisma.UserCreateInput,
  ): Promise<Omit<User, 'password'>> {
    try {
      if (createUserDto.password) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      }

      createUserDto.role = Role.user;

      const user = await this.prisma.user.create({ data: createUserDto });
      const { password, ...rest } = user;
      return rest;
    } catch (err) {
      throw new Error(`Error creating user: ${err.message}`);
    }
  }
}
