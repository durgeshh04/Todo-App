import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({default: false})
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
