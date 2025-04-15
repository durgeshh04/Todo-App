import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { MainModule } from './module/main.module';

@Module({
  imports: [DatabaseModule, MainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
