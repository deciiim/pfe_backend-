import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository }                     from '@nestjs/typeorm';
import { Repository, DeleteResult }             from 'typeorm';
import * as bcrypt                              from 'bcrypt';

import { User }              from './user.entity';
import { CreateUserDto }     from './dto/create-user.dto';
import { UpdateUserDto }     from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,  // Using `repo` as the repository
  ) {}

  // Create a new user
  async create(dto: CreateUserDto): Promise<User> {
    const exists = await this.repo.findOneBy({ email: dto.email });
    if (exists) throw new HttpException('Email exists', HttpStatus.BAD_REQUEST);

    const hash = await bcrypt.hash(dto.password, 10);
    const u = this.repo.create({ ...dto, password: hash });
    return this.repo.save(u);
  }

  // Get all users
  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  // Find a user by ID
  findOneById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  // Find a user by name
  findByName(name: string): Promise<User | null> {
    return this.repo.findOne({ where: { name } });
  }

  // Update a user by ID
  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const u = await this.findOneById(id);
    if (!u) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    Object.assign(u, dto);
    return this.repo.save(u);
  }

  // Delete a user by ID
  async delete(id: number): Promise<void> {
    const res: DeleteResult = await this.repo.delete(id);
    if (res.affected === 0) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  // Find a user by email (corrected method)
  // Find a user by email
  async findByEmail(email: string): Promise<User> {
    if (!email) throw new HttpException('You must insert an email', HttpStatus.BAD_REQUEST);
    
    const user = await this.repo.findOne({ where: { email } });
    if (!user) throw new HttpException('Email does not exist', HttpStatus.NOT_FOUND);

    return user;
  }

}
