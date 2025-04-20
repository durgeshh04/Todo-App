import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ description: 'This is title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'This is description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'This is completed', default: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean = false;
}
