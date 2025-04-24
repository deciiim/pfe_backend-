import { Controller, Post, Body, Get, Param, Put, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Roles } from '../auth/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { enumRole } from '../users/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private svc: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.svc.create(dto);
  }

  @Get()
  @Roles(enumRole.ResponsableAchat)
  findAll(): Promise<User[]> {
    return this.svc.findAll();
  }

  @Get(':id')
  @Roles(enumRole.ResponsableAchat)
  findOne(@Param('id') id: number) {
    return this.svc.findOneById(id);
  }

  @Put(':id')
  @Roles(enumRole.ResponsableAchat)
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @Roles(enumRole.ResponsableAchat)
  remove(@Param('id') id: number) {
    return this.svc.delete(id);
  }

  // Request password reset
  @Post('request-password-reset')
  async requestPasswordReset(@Body() body: RequestPasswordResetDto) {
    const message = await this.svc.requestPasswordReset(body.email);
    return { message };
  }

  // Handle password reset using token
  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(@Body() body: ResetPasswordDto) {
    await this.svc.resetPassword(body.token, body.newPassword);
    return { message: 'Password updated successfully' };
  }
}
