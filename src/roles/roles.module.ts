import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  // Import TypeOrmModule
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './role.entity';  // Import the Role entity
import { Action } from '../actions/action.entity';  // Import the Action entity

@Module({
  imports: [TypeOrmModule.forFeature([Role, Action])],  // Add Action entity here
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
