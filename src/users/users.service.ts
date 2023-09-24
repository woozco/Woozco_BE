import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({email});
  }

  async insert(createUserDto: CreateUserDto): Promise<InsertResult | undefined> {
    return this.userRepository.insert(createUserDto);
  }

  async update(id: number, loginDto: LoginDto): Promise<UpdateResult | undefined> {
    return this.userRepository.update(id, loginDto);
  }
}
