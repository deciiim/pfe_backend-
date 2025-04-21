// src/demande-achat/demande-achat.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { DemandeAchatService } from './demande-achat.service';
import { CreateDemandeAchatDto } from './dto/create-demande-achat.dto';
import { UpdateDemandeAchatStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/role.enum';
import { DemandeAchatStatus } from './enum/demande-achat-status.enum';

@Controller('demande-achat')
@UseGuards(JwtAuthGuard)
export class DemandeAchatController {
  constructor(private svc: DemandeAchatService) {}

  // Create a new DemandeAchat for the authenticated user
  @Post()
  @Roles(Role.Demandeur)
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateDemandeAchatDto, @Request() req) {
    return this.svc.create(dto, req.user);
  }

  // Get all DemandeAchat records, with optional filtering by status and pagination
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Demandeur, Role.ResponsableAchat, Role.DirectionGenerale)
  findAll(
    @Request() req,
    @Query('status') status?: DemandeAchatStatus,
    @Query('page') page: number = 1,  // Default to page 1 if not provided
    @Query('limit') limit: number = 10  // Default to 10 records per page if not provided
  ) {
    const user = req.user;
    return this.svc.findAll(status, user, page, limit);  // Pass the pagination parameters to the service
  }

  // Update the status of a DemandeAchat
  @Patch(':id/status')
  @Roles(Role.DirectionGenerale, Role.ResponsableAchat)
  @UseGuards(RolesGuard)
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateDemandeAchatStatusDto,
  ) {
    return this.svc.updateStatus(+id, dto.status);
  }
}
