// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy }                 from '@nestjs/passport';
import { ExtractJwt, Strategy }             from 'passport-jwt';
import { ConfigService }                    from '@nestjs/config';
import { UsersService }                     from '../users/users.service';
import { User }                             from '../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly users: UsersService,
    private readonly config:  ConfigService,
  ) {
    // Pull the secret out before calling `super`
    const secret = config.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('⚠️ JWT_SECRET must be defined in your .env');
    }

    super({
      jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:      secret,     // now definitely a string
    });
  }

  // The `validate` method is called after the token is verified;
  // it must return a user object (attached to request.user) or throw.
  async validate(payload: any): Promise<User> {
    console.log('✅ JWT validate()', payload);
    const user = await this.users.findOneById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
