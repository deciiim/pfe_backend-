import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Role } from '../roles/role.entity';
import { DemandeAchat } from '../demandes/demande-achat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => DemandeAchat, (demandeAchat) => demandeAchat.requester)
  demandesAchats: DemandeAchat[];
}
