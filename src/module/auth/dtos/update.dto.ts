import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  IsOptional,
} from '@nestjs/class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsPhoneNumber()
  @IsOptional()
  mobile?: string;

  @IsString()
  @IsOptional()
  gender?: string;
}