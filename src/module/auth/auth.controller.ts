import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { CreateUserDto } from './dtos/create.dto';
import { ApiTags } from '@nestjs/swagger';
import { loginDto } from './dtos/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('signup')
  async signup(@Body() user: CreateUserDto): Promise<any> {
    return this.authService.signup(user);
  }

  @Post('login')
  async login(@Body() user: loginDto): Promise<any> {
    return this.authService.login(user);
  }
}
