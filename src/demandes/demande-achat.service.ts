import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DemandeAchat } from './demande-achat.entity';
import { CreateDemandeAchatDto } from './dto/create-demande-achat.dto'; // Ensure this DTO exists
import { UpdateDemandeAchatDto } from './dto/update-demande-achat.dto'; // Ensure this DTO exists

@Injectable()
export class DemandeAchatService {
  constructor(
    @InjectRepository(DemandeAchat)
    private readonly demandeAchatRepository: Repository<DemandeAchat>,
  ) {}

  // Create DemandeAchat
  async create(createDemandeAchatDto: CreateDemandeAchatDto): Promise<DemandeAchat> {
    const demandeAchat = this.demandeAchatRepository.create(createDemandeAchatDto);
    return this.demandeAchatRepository.save(demandeAchat);
  }

  // Get all DemandeAchats
  async findAll(): Promise<DemandeAchat[]> {
    return this.demandeAchatRepository.find();
  }

  // Get one DemandeAchat by ID
  async findOne(id: number): Promise<DemandeAchat> {
    const demandeAchat = await this.demandeAchatRepository.findOne({ where: { id } });
    if (!demandeAchat) {
      throw new NotFoundException(`DemandeAchat with ID ${id} not found`);
    }
    return demandeAchat;
  }

  // Update DemandeAchat
  async update(id: number, updateDemandeAchatDto: UpdateDemandeAchatDto): Promise<DemandeAchat> {
    await this.demandeAchatRepository.update(id, updateDemandeAchatDto);
    // After updating, return the updated entity
    return this.findOne(id);
  }

  // Delete DemandeAchat
  async remove(id: number): Promise<void> {
    const demandeAchat = await this.findOne(id); // Ensures the entity exists before deletion
    await this.demandeAchatRepository.delete(id);
  }
}
