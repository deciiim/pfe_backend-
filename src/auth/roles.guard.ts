import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../users/role.enum'; // Import Role enum
import { Observable } from 'rxjs';  // Import Observable from RxJS

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Retrieve required roles for the route handler
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());

    // If no roles are required, allow access
    if (!requiredRoles) {
      return true;
    }

    // Get the user from the request object
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Log user role and required roles for debugging
    console.log('User role:', user.role);  // Log the user's role
    console.log('Required roles:', requiredRoles);  // Log the required roles for this route

    // Check if the user's role is in the list of required roles
    return requiredRoles.includes(user.role); // If user's role matches any required role
  }
}
