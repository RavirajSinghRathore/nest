import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const [users, count] = await this.userRepository.findAndCount();
    await this.userRepository.find();
    return {
      response: users,
      count: count,
    };
  }

  async create(user: CreateUserDto) {
    const userEntity = this.userRepository.create(user);
    return { response: await this.userRepository.save(userEntity) };
  }

  async findByMail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findById(id: number) {
    return { response: await this.userRepository.findOneBy({ id }) };
  }
}
