import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../../roles/role.entity';  // Adjust the import path based on your project structure
import { Action } from '../action.entity';  // Adjust the import path based on your project structure

@Entity('RoleActions')
export class RoleAction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role) => role.roleActions)
  @JoinColumn({ name: 'role_id' })  // Foreign key column to Role
  role: Role;

  @ManyToOne(() => Action, (action) => action.roleActions)
  @JoinColumn({ name: 'action_id' })  // Foreign key column to Action
  action: Action;
}
