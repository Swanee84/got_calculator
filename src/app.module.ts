import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SoldierModule } from './soldier/soldier.module';
import { CodeModule } from './code/code.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot(), UserModule, SoldierModule, CodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
