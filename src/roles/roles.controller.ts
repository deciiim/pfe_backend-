import { Controller, Get, Post, Body } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Route to get all roles
  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  // Route to create a new role
  @Post()
  async create(@Body() createRoleDto: { name: string }): Promise<Role> {
    return this.rolesService.create(createRoleDto.name);
  }
}
