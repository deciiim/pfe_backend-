import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandeProjetService } from './demande-projet.service';
import { DemandeProjetController } from './demande-projet.controller';
import { DemandeProjet } from './demande-projet.entity';
import { DemandeAchat } from '../demande-achat/demande-achat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DemandeProjet, DemandeAchat]),
  ],
  providers: [DemandeProjetService],
  controllers: [DemandeProjetController],
  exports: [TypeOrmModule], // ✅ Export to make it available elsewhere
})
export class DemandeProjetModule {}
