import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  MinLength,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gender: string;
}
