import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fournisseur } from './fournisseur.entity';  // Import the Fournisseur entity
import { FournisseursService } from './fournisseurs.service';
import { FournisseursController } from './fournisseurs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fournisseur])],  // Add the entity to TypeOrmModule
  providers: [FournisseursService],
  controllers: [FournisseursController],
  exports: [TypeOrmModule],
})
export class FournisseursModule {}
