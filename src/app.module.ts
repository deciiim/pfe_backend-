import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { BonsCommandesModule } from './bons-commandes/bons-commandes.module';
import { DemandesModule } from './demandes/demandes.module';
import { FournisseursModule } from './fournisseurs/fournisseurs.module';
import { ProjectsModule } from './projects/projects.module';
import { ActionsModule } from './actions/actions.module';
import { BonsCommande } from './bons-commandes/bon-commande.entity';  // Import your entities
import { DemandeProjet } from './demandes/demande-projet/demande-projet.entity';
import { Fournisseur } from './fournisseurs/fournisseur.entity';
import { DemandeAchat } from './demandes/demande-achat.entity';
import { User } from './users/user.entity';
import { Project } from './projects/project.entity';
import { Role } from './roles/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'decim1234',
      database: 'purchase_workflow',
      autoLoadEntities: true,  // This can be used if you want auto-loading
      synchronize: false,  // Be careful with this in production, it auto-syncs schema changes
      entities: [ // Explicitly add entities here
        BonsCommande,
        DemandeProjet,
        Fournisseur,
        DemandeAchat,
        User,
        Project,
        Role,
      ],
    }),
    RolesModule,
    UsersModule,
    ActionsModule,
    ProjectsModule,
    FournisseursModule,
    DemandesModule,
    BonsCommandesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
