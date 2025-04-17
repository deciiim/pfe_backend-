import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DemandeAchat } from '../demandes/demande-achat.entity';

@Entity('Projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @OneToMany(() => DemandeAchat, da => da.project)
  demandesAchats: DemandeAchat[];
}
