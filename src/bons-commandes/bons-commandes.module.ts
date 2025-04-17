import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonsCommande } from './bon-commande.entity';  // Import the BonCommande entity
import { BonsCommandesService } from './bons-commandes.service';
import { BonsCommandesController } from './bons-commandes.controller';
import { FournisseursModule } from '../fournisseurs/fournisseurs.module';
import { DemandesModule } from '../demandes/demandes.module';
@Module({
  imports: [TypeOrmModule.forFeature([BonsCommande]),FournisseursModule, DemandesModule],
    // Add the entity to TypeOrmModule
  providers: [BonsCommandesService],
  controllers: [BonsCommandesController]
})
export class BonsCommandesModule {}
