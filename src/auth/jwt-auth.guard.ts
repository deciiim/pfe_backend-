import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // This method is called after the user is authenticated
  handleRequest(err, user, info) {
    console.log('🔐 AuthGuard ->', { err, user, info });

    // If there's an error or the user is not found, throw UnauthorizedException
    if (err || !user) {
      throw err ?? new UnauthorizedException(); // Handle errors gracefully
    }

    // If everything is fine, return the user object
    return user;
  }
}
