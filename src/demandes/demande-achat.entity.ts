import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';
import { DemandeProjet } from '../demandes/demande-projet/demande-projet.entity';

@Entity()
export class DemandeAchat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.demandesAchats)
  requester: User;

  @ManyToOne(() => Project, (project) => project.demandesAchats)
  project: Project;

  @OneToOne(() => DemandeProjet, (demandeProjet) => demandeProjet.demandeAchat)
  @JoinColumn()
  demandeProjet: DemandeProjet;
}
