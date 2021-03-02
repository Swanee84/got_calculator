import { Controller, Body, Param, Get, Patch, ParseIntPipe } from '@nestjs/common';
import { SoldierService } from './soldier.service';
import { BaseResponse, StandardResponse } from '../common/response.interface';
import SoldierEntity from '../entities/soldier.entity';
import { IUser } from '../entities/user.entity';
import Auth from '../auth/auth.decorator';
import { Constant, Message, RoleConst } from '../common/constant';

@Controller('soldier')
export class SoldierController {
  constructor(private readonly soldierService: SoldierService) {}

  @Get(':id')
  async findAll(@Param('id', new ParseIntPipe()) id: number): Promise<StandardResponse<SoldierEntity>> {
    const data = await this.soldierService.findOne(id);
    const response = new StandardResponse<SoldierEntity>({ data });
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

  @Patch(':id')
  async update(@Auth({}) user: IUser, @Param('id', new ParseIntPipe()) searchSoldierId: number, @Body() soldierData: SoldierEntity): Promise<BaseResponse> {
    const userId = user.id;
    const role = user.role;

    const soldier = await this.soldierService.findOne(searchSoldierId);
    if (!soldier) {
      return Promise.resolve(new BaseResponse(Message.NOT_UPDATE_DATA, Constant.UPDATE_NOT_FOUND, 405, false));
    }
    if (userId != soldier.createdId && ([RoleConst.ADMIN, RoleConst.DUKE, RoleConst.MARQUIS].indexOf(role) < 0 || user.guildCode !== soldier.user.guildCode)) {
      return Promise.resolve(new BaseResponse(Message.DISALLOWED_USER, Constant.UNAUTHORIZED, 401, false));
    }
    soldierData.updatedId = userId;
    const updated = Object.assign(soldier, soldierData);
    const data = await this.soldierService.update(updated);
    const response = data ? new StandardResponse({ data }) : new BaseResponse(Message.NOT_UPDATE_DATA, Constant.UPDATE_NOT_FOUND, 405, false);
    return Promise.resolve(response);
  }
}
