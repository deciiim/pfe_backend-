import { Module } from '@nestjs/common';
import { ProjetService } from './projet.service';
import { ProjetController } from './projet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projet } from './projet.entity';  // Ensure this import is correct

@Module({
  imports: [TypeOrmModule.forFeature([Projet])],  // Add this line to provide ProjetRepository
  providers: [ProjetService],
  controllers: [ProjetController],
})
export class ProjetModule {}
