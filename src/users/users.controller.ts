import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UsersService }         from './users.service';
import { CreateUserDto }        from './dto/create-user.dto';
import { UpdateUserDto }        from './dto/update-user.dto';
import { User }                 from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private svc: UsersService) {}

  @Post()  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.svc.create(dto);
  }
  @Get()   findAll(): Promise<User[]> {
    return this.svc.findAll();
  }
  @Get(':id') findOne(@Param('id') id: number) {
    return this.svc.findOneById(id);
  }
  @Put(':id') update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.svc.update(id, dto);
  }
  @Delete(':id') remove(@Param('id') id: number) {
    return this.svc.delete(id);
  }
}
