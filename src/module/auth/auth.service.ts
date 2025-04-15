import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  constructor() {}

  async signup(user: any): Promise<any> {
    console.log('This is signup method');
    return user;
  }

  async login(user: any): Promise<any> {
    console.log('This is login method');
    return user;
  }
}
