import { Injectable } from '@nestjs/common';
import { AuthRepo } from './repository/auth.repo';

@Injectable()
export class AuthenticationService {
  constructor(private readonly authRepo: AuthRepo) {}

  async signup(user: any): Promise<any> {
    return this.authRepo.createUser(user);
  }

  async login(user: any): Promise<any> {
    return user;
  }
}
