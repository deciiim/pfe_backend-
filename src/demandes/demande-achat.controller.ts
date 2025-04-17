import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DemandeAchatService } from './demande-achat.service';
import { CreateDemandeAchatDto } from './dto/create-demande-achat.dto';
import { UpdateDemandeAchatDto } from './dto/update-demande-achat.dto';

@Controller('demande-achats')
export class DemandeAchatController {
  constructor(private readonly demandeAchatService: DemandeAchatService) {}

  @Post()
  async create(@Body() createDemandeAchatDto: CreateDemandeAchatDto) {
    return this.demandeAchatService.create(createDemandeAchatDto);
  }

  @Get()
  async findAll() {
    return this.demandeAchatService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.demandeAchatService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDemandeAchatDto: UpdateDemandeAchatDto,
  ) {
    return this.demandeAchatService.update(id, updateDemandeAchatDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.demandeAchatService.remove(id);
  }
}
