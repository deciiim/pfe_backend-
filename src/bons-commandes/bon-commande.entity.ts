import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { DemandeProjet } from '../demandes/demande-projet/demande-projet.entity';
import { Fournisseur } from '../fournisseurs/fournisseur.entity';

@Entity()
export class BonsCommande {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateCommande: string;

  @ManyToOne(() => DemandeProjet, (demandeProjet) => demandeProjet.bonsCommandes)
  demandeProjet: DemandeProjet;

  @ManyToOne(() => Fournisseur, (fournisseur) => fournisseur.bonsCommandes)
  fournisseur: Fournisseur;
}
