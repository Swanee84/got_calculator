import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SoldierService } from './soldier.service';
import { StandardResponse } from '../common/response.interface';
import SoldierEntity from '../entities/soldier.entity';

@Controller('soldier')
export class SoldierController {
  constructor(private readonly soldierService: SoldierService) {}

  @Get(':id')
  async findAll(@Param('id', new ParseIntPipe()) id: number): Promise<StandardResponse<SoldierEntity>> {
    const dataList = await this.soldierService.findAll({ id });
    const response = new StandardResponse<SoldierEntity>({ dataList });
    return Promise.resolve(response);
  }

  @Get('user/:id')
  async userFindAll(@Param('id', new ParseIntPipe()) userId: number): Promise<StandardResponse<SoldierEntity>> {
    const dataList = await this.soldierService.findAll({ userId });
    const response = new StandardResponse<SoldierEntity>({ dataList });
    return Promise.resolve(response);
  }

  @Get('account/:id')
  async accountFindAll(@Param('id', new ParseIntPipe()) accountId: number): Promise<StandardResponse<SoldierEntity>> {
    const dataList = await this.soldierService.findAll({ accountId });
    const response = new StandardResponse<SoldierEntity>({ dataList });
    return Promise.resolve(response);
  }
}
