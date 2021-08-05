import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { BaseResponse, StandardResponse } from '../common/response.interface';
import { CodeService } from './code.service';
import { CodeEntity } from '../entities/code.entity';
import Auth from '../auth/auth.decorator';
import { Constant, Message, RoleConst } from '../common/constant';

@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Get()
  async findAll(@Query('code') code?: string): Promise<StandardResponse<CodeEntity>> {
    const dataList = await this.codeService.findAll(code);
    const response = new StandardResponse<CodeEntity>({ dataList });
    return Promise.resolve(response);
  }

  @Post()
  async create(@Auth({ key: 'id', roles: [RoleConst.ADMIN] }) userId: number, @Body() codeData: CodeEntity): Promise<StandardResponse<CodeEntity>> {
    codeData.createdId = userId;
    const data = await this.codeService.create(codeData);
    const dataList = await this.codeService.findAll();
    const response = data ? new StandardResponse<CodeEntity>({ dataList }) : new BaseResponse(Message.NOT_INSERT_DATA, Constant.INSERT_NOT_FOUND, 405, false);
    return Promise.resolve(response);
  }

  @Patch(':codeId')
  async update(
    @Auth({ key: 'id', roles: [RoleConst.ADMIN] }) userId: number,
    @Param('codeId') codeId: number,
    @Body() codeData: CodeEntity,
  ): Promise<StandardResponse<CodeEntity>> {
    codeData.updatedId = userId;
    const data = await this.codeService.update(codeId, codeData);
    const dataList = await this.codeService.findAll();
    const response = data ? new StandardResponse<CodeEntity>({ dataList }) : new BaseResponse(Message.NOT_UPDATE_DATA, Constant.UPDATE_NOT_FOUND, 405, false);
    return response;
  }

  @Delete(':codeId')
  async delete(@Auth({ key: 'id', roles: [RoleConst.ADMIN] }) userId: number, @Param('codeId') codeId: number): Promise<StandardResponse<CodeEntity>> {
    const data = await this.codeService.delete(codeId);
    if (data.parentCode === Constant.ROOT) {
      await this.codeService.subCodeDelete(data.code);
    }
    const dataList = await this.codeService.findAll();
    const response = data ? new StandardResponse<CodeEntity>({ dataList }) : new BaseResponse(Message.NOT_UPDATE_DATA, Constant.UPDATE_NOT_FOUND, 405, false);
    return response;
  }
}
