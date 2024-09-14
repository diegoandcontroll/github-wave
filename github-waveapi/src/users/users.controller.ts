import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/publicRoutes/public';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }
}
