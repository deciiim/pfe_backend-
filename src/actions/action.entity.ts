import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,OneToMany
} from 'typeorm';
import { Role } from '../roles/role.entity';
import { RoleAction } from '../actions/role-action/role-action.entity'; // or wherever it is


@Entity('actions')
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Role, role => role.actions)
  roles: Role[];
  @OneToMany(() => RoleAction, (roleAction) => roleAction.action)
  roleActions: RoleAction[];
}
