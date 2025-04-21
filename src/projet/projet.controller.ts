import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjetService } from './projet.service';
import { CreateProjetDto } from './dto/create-projet.dto';
import { UpdateProjetDto } from './dto/update-projet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/role.enum';

@Controller('projet')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjetController {
  constructor(private readonly projetService: ProjetService) {}

  @Post()
  @Roles(Role.ResponsableAchat) // Only users with 'ResponsableAchat' role can access this
  create(@Body() dto: CreateProjetDto, @Request() req) {
    const user = req.user;
    return this.projetService.create(dto, user);
  }

  @Get()
  @Roles(Role.ResponsableAchat, Role.DirectionGenerale) // Both 'ResponsableAchat' and 'DirectionGenerale' can access this
  findAll() {
    return this.projetService.findAll();
  }

  @Get(':id')
  @Roles(Role.ResponsableAchat, Role.DirectionGenerale) // Both 'ResponsableAchat' and 'DirectionGenerale' can access this
  findOne(@Param('id') id: string) {
    return this.projetService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ResponsableAchat,Role.DirectionGenerale) // Only users with 'ResponsableAchat' role can update a project
  update(@Param('id') id: string, @Body() dto: UpdateProjetDto) {
    return this.projetService.update(+id, dto);
  }

  @Delete(':id')
  @Roles(Role.ResponsableAchat) // Only users with 'ResponsableAchat' role can delete a project
  remove(@Param('id') id: string) {
    return this.projetService.remove(+id);
  }
}
