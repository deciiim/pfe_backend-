import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandeAchatService } from './demande-achat.service';
import { DemandeAchatController } from './demande-achat.controller';
import { DemandeAchat } from './demande-achat.entity';
import { User } from '../users/user.entity';  // User entity import
import { Role } from '../roles/role.entity';  // Role entity import
import { UsersModule } from '../users/users.module';  // Import the Users module to make UserRepository available
import { RolesModule } from '../roles/roles.module';  // If you have a RolesModule, import it here as well

@Module({
  imports: [
    TypeOrmModule.forFeature([DemandeAchat, User, Role]), // Include User and Role repositories here
    UsersModule, // Import UsersModule to inject UserRepository
    RolesModule, // If roles are handled in a separate module
  ],
  providers: [DemandeAchatService],
  controllers: [DemandeAchatController],
})
export class DemandeAchatModule {}
