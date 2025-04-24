
import {Controller,Post,Body,UseGuards,Request,Get,Patch,Param,Query,Delete} from '@nestjs/common';
import { DemandeAchatService } from './demande-achat.service';
import { CreateDemandeAchatDto } from './dto/create-demande-achat.dto';
import { UpdateDemandeAchatStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { enumRole } from '../users/role.enum';
import { DemandeAchatStatus } from './enum/demande-achat-status.enum';

@Controller('demande-achat')
@UseGuards(JwtAuthGuard)
export class DemandeAchatController {
  constructor(private svc: DemandeAchatService) {}


  @Post()
  @Roles(enumRole.Demandeur)
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateDemandeAchatDto, @Request() req) {
    return this.svc.create(dto, req.user);
  }


  @Get()
  @UseGuards(RolesGuard)
  @Roles(enumRole.Demandeur, enumRole.ResponsableAchat, enumRole.DirectionGenerale)
  findAll(
    @Request() req,
    @Query('status') status?: DemandeAchatStatus,
    @Query('page') page: number = 1,  
    @Query('limit') limit: number = 10  
  ) {
    const user = req.user;
    return this.svc.findAll(status, user, page, limit);  
  }

  
  @Patch(':id/status')
  @Roles(enumRole.DirectionGenerale, enumRole.ResponsableAchat)
  @UseGuards(RolesGuard)
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateDemandeAchatStatusDto,
  ) {
    return this.svc.updateStatus(+id, dto.status);
  }
  @Delete(':id')
  @Roles(enumRole.Demandeur, enumRole.ResponsableAchat, enumRole.DirectionGenerale)
  @UseGuards(RolesGuard, JwtAuthGuard)
  async deleteDemandeAchat(@Param('id') id: string, @Request() req) {
    // Check role and delegate delete logic based on role
    const user = req.user;
    
    if (user.role === enumRole.Demandeur) {
      // Demandeur can only delete their own DA
      return this.svc.deleteOwn(+id, user);
    }
    
    // ResponsableAchat or DirectionGenerale can delete any DA
    return this.svc.deleteAny(+id);
  }
  
}
