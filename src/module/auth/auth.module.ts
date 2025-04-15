import { Module } from '@nestjs/common';
import { AuthenticationController } from './auth.controller';
import { AuthenticationService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/auth.entity';
import { AuthRepo } from './repository/auth.repo';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthRepo],
})
export class AuthModule {}
