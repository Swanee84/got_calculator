import { Module } from '@nestjs/common';
import { SoldierService } from './soldier.service';
import { SoldierController } from './soldier.controller';

@Module({
  providers: [SoldierService],
  controllers: [SoldierController],
})
export class SoldierModule {}
