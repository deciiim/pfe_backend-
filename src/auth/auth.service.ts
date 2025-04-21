import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const u = await this.users.findByEmail(email);  // Updated to find by email
    if (!u) throw new UnauthorizedException('Bad credentials');

    const ok = await bcrypt.compare(pass, u.password);
    if (!ok) throw new UnauthorizedException('Bad credentials');
    console.log(`⚡⚡ Successful login by:`);
    console.log(`👤 Name: ${u.name}`);
    console.log(`🤖 Role: ${u.role}`);
    console.log(`🔐 Password (hashed): ${u.password}`);
    console.log(`🔑 Provided password: ${pass}`);
    console.log(`Role (user.role): ${u.role}`);
    return u;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };  // Using email for payload
    return { access_token: this.jwt.sign(payload) };
  }
}
