import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private users: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {  // Changed to use email
    const u = await this.auth.validateUser(body.email, body.password);  // Validate by email
    return this.auth.login(u);
  }
}
