import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionsService } from './actions.service';
import { RoleActionService } from './role-action/role-action.service';
import { RoleActionController } from './role-action/role-action.controller';
import { ActionsController } from './actions.controller';
import { Action } from './action.entity';
import { Role } from '../roles/role.entity';  // Import the Role entity here
import { RoleAction } from '../actions/role-action/role-action.entity';  // Import the RoleAction entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Action, Role, RoleAction]),  // Add RoleAction here
  ],
  providers: [ActionsService, RoleActionService],
  controllers: [ActionsController, RoleActionController],
})
export class ActionsModule {}
