import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projet } from './projet.entity';
import { CreateProjetDto } from './dto/create-projet.dto';
import { UpdateProjetDto } from './dto/update-projet.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ProjetService {
  constructor(
    @InjectRepository(Projet)
    private readonly projetRepository: Repository<Projet>,
  ) {}

  async create(createProjetDto: CreateProjetDto, user: User): Promise<Projet> {
    // Create and associate the user as 'responsableAchat'
    const projet = this.projetRepository.create({
      ...createProjetDto,
      responsableAchat: user,
    });

    // Save and return the created project
    return this.projetRepository.save(projet);
  }

  async findAll(): Promise<Projet[]> {
    // Return all projects
    return this.projetRepository.find();
  }

  async findOne(id: number): Promise<Projet> {
    // Find the project by ID, or throw NotFoundException if not found
    const projet = await this.projetRepository.findOne({ where: { id } });
    if (!projet) {
      throw new NotFoundException(`Projet with ID ${id} not found`);
    }
    return projet;
  }

  async update(id: number, updateProjetDto: UpdateProjetDto): Promise<Projet> {
    // Try to find the existing project
    const projet = await this.projetRepository.findOne({ where: { id } });
    if (!projet) {
      throw new NotFoundException(`Projet with ID ${id} not found`);
    }
  
    // Update the project directly
    await this.projetRepository.update(id, updateProjetDto);
  
    // Retrieve the updated project from the repository and ensure it exists
    const updatedProjet = await this.projetRepository.findOne({ where: { id } });
    if (!updatedProjet) {
      throw new NotFoundException(`Projet with ID ${id} not found after update`);
    }
  
    return updatedProjet;
  }
  

  async remove(id: number): Promise<void> {
    // Try to delete the project by ID
    const result = await this.projetRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Projet with ID ${id} not found`);
    }
  }
}
