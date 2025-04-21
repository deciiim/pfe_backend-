// src/demande-achat/demande-achat.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDemandeAchatDto } from './dto/create-demande-achat.dto';
import { DemandeAchat } from './demande-achat.entity';
import { User } from '../users/user.entity';
import { DemandeAchatStatus } from './enum/demande-achat-status.enum';

@Injectable()
export class DemandeAchatService {
  constructor(
    @InjectRepository(DemandeAchat)
    private repo: Repository<DemandeAchat>,
  ) {}

  // Create a new DemandeAchat and associate it with the user
  create(dto: CreateDemandeAchatDto, user: User): Promise<DemandeAchat> {
    const da = this.repo.create({ ...dto, user, userId: user.id });
    return this.repo.save(da);
  }

  // Find all DemandeAchat records with filtering by role and status, adding pagination and sorting
  async findAll(
    status?: DemandeAchatStatus,
    user?: User,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: DemandeAchat[]; meta: any }> {
    const query = this.repo.createQueryBuilder('da')
      .leftJoinAndSelect('da.user', 'user')  // Optionally include user data
      .leftJoinAndSelect('da.demandeProjets', 'demandeProjets')  // Optionally include related projects
      .leftJoinAndSelect('da.bonCommandes', 'bonCommandes');  // Optionally include related orders

    // Filter by role - Demandeur can only see their own records
    if (user && user.role === 'Demandeur') {
      query.andWhere('da.userId = :userId', { userId: user.id });
    }

    // Filter by status
    if (status) {
      query.andWhere('da.status = :status', { status });
    }

    // Add sorting by createdAt (descending order by default)
    query.orderBy('da.createdAt', 'DESC')
      .skip((page - 1) * limit)  // Pagination - skip records for the current page
      .take(limit);  // Limit the number of records returned

    // Get the paginated data
    const [data, totalItems] = await query.getManyAndCount();

    // Calculate totalPages
    const totalPages = Math.ceil(totalItems / limit);

    // Return the data and meta information
    return {
      data,
      meta: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    };
  }

  // Update the status of a DemandeAchat
  async updateStatus(id: number, status: DemandeAchatStatus): Promise<DemandeAchat> {
    const da = await this.repo.findOne({ where: { id } });
    if (!da) {
      throw new NotFoundException(`DemandeAchat with ID ${id} not found`);
    }

    da.status = status;
    return this.repo.save(da);
  }
}
