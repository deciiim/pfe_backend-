import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BonsCommande } from '../bons-commandes/bon-commande.entity';

@Entity()
export class Fournisseur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contactInfo: string;

  @OneToMany(() => BonsCommande, (bonsCommande) => bonsCommande.fournisseur)
  bonsCommandes: BonsCommande[];
}
