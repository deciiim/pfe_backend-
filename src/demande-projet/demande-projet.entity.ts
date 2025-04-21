import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,OneToMany } from 'typeorm';
import { DemandeAchat } from '../demande-achat/demande-achat.entity';
import { Projet } from '../projet/projet.entity';  // Import Projet entity
import {BonCommande} from '../bon-commande/bon-commande.entity'
@Entity()
export class DemandeProjet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => DemandeAchat, (demandeAchat) => demandeAchat.demandeProjets)
  @JoinColumn({ name: 'demandeAchatId' })
  demandeAchat: DemandeAchat;

  @ManyToOne(() => Projet, (projet) => projet.demandeProjets)  // Add relation to Projet
  @JoinColumn({ name: 'projetId' })  // Foreign key for the project
  projet: Projet;
  
  @Column({ default: 'Pending' })
  status: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => BonCommande, (bc) => bc.demandeProjet)
bonCommandes: BonCommande[];
}
