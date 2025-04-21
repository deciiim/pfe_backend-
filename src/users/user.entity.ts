import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role }                   from './role.enum';
import { DemandeAchat }           from '../demande-achat/demande-achat.entity';
import  {Projet} from '../projet/projet.entity'
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()  id: number;

  @Column()                  name: string;
  @Column({ unique: true })  email: string;
  @Column()                  password: string;

  @Column({
    type:    'enum',
    enum:    Role,
    default: Role.Demandeur,
  })
  role: Role;

  @OneToMany(() => DemandeAchat, da => da.user)
  demandes: DemandeAchat[];
  @OneToMany(() => Projet, projet => projet.responsableAchat)
  projets: Projet[];

}
