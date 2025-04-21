import { Controller, Post, Get, Param, Body, Patch, Delete,ParseIntPipe } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';
import { CreateFournisseurDto } from './dto/create-fournisseur.dto';
import { UpdateFournisseurDto } from './dto/update-fournisseur.dto';
import { Roles } from '../auth/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../users/role.enum';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('fournisseurs')
export class FournisseurController {
  constructor(private readonly fournisseurService: FournisseurService) {}

  @Post()
  @Roles(Role.ResponsableAchat) // 👈 only Responsable achat can create
  create(@Body() dto: CreateFournisseurDto) {
    return this.fournisseurService.create(dto);
  }

  @Get()
  findAll() {
    return this.fournisseurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fournisseurService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ResponsableAchat) // 👈 only Responsable achat can update
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFournisseurDto,
  ) {
    return this.fournisseurService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ResponsableAchat) // 👈 only Responsable achat can delete
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fournisseurService.remove(id);
  }
}
