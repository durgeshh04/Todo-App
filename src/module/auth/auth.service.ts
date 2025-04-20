import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepo } from './repository/auth.repo';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly authRepo: AuthRepo,
    private readonly jwt: JwtService,
  ) {}

  async signup(user: any): Promise<any> {
    const existingUser = await this.authRepo.findUserByEmail(user.email);
    console.log(existingUser);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.authRepo.createUser({
      ...user,
      password: hashedPassword,
    });

    return { message: 'User created successfully', newUser };
  }

  async login(user: any): Promise<any> {
    const existingUser = await this.authRepo.findUserByEmail(user.email);
    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = { sub: existingUser.id, email: existingUser.email };

    const token = this.jwt.sign(payload);
    return {
      access_token: token,
    };
  }
}
