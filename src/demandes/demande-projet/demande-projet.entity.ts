import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { DemandeAchat } from '../demande-achat.entity';
import { BonsCommande } from '../../bons-commandes/bon-commande.entity';

@Entity()
export class DemandeProjet {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => DemandeAchat, (demandeAchat) => demandeAchat.demandeProjet)
  @JoinColumn()
  demandeAchat: DemandeAchat;

  @OneToMany(() => BonsCommande, (bonsCommande) => bonsCommande.demandeProjet)
  bonsCommandes: BonsCommande[];
}
