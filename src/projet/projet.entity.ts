import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { DemandeProjet } from '../demande-projet/demande-projet.entity';  // Import DemandeProjet entity

@Entity()
export class Projet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.projets)
  responsableAchat: User;

  @OneToMany(() => DemandeProjet, (demandeProjet) => demandeProjet.projet)
  demandeProjets: DemandeProjet[];  // Reverse relation to DemandeProjet
    
  // Additional fields can be added as needed
}
