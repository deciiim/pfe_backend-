import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,JoinTable,OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Action } from '../actions/action.entity';
import { RoleAction } from '../actions/role-action/role-action.entity'; // or wherever it is


@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, user => user.roles)
  users: User[];

  @OneToMany(() => RoleAction, (roleAction) => roleAction.role)
  roleActions: RoleAction[];

  @ManyToMany(() => Action, action => action.roles)
@JoinTable({
  name: 'role_actions',
  joinColumn: { name: 'role_id', referencedColumnName: 'id' },
  inverseJoinColumn: { name: 'action_id', referencedColumnName: 'id' },
})
actions: Action[];
}
