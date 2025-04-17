import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandeAchatService } from './demande-achat.service';
import { DemandeAchatController } from './demande-achat.controller';
import { DemandeAchat } from './demande-achat.entity';
import { Project } from '../projects/project.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DemandeAchat, Project, User])],
  controllers: [DemandeAchatController],
  providers: [DemandeAchatService],
})
export class DemandesModule {}
