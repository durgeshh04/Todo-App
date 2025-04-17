import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/auth.entity';
import { Repository } from 'typeorm';

export class AuthRepo {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepo: Repository<UserEntity>,
  ) {}

  async createUser(user: any): Promise<any> {
    return await this.authRepo.save(user);
  }

  async findUserByEmail(email: string) {
    return await this.authRepo.findOne({ where: { email } });
  }
}
