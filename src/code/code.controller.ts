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
    const response = new StandardResponse<CodeEntity>({ data });
    return Promise.resolve(response);
  }

  @Patch(':code')
  async update(
    @Auth({ key: 'id', roles: [RoleConst.ADMIN] }) userId: number,
    @Param('code') code: string,
    @Body() codeData: CodeEntity,
  ): Promise<StandardResponse<CodeEntity>> {
    codeData.updatedId = userId;
    const data = await this.codeService.update(code, codeData);
    if (data.parentCode === Constant.ROOT && code !== codeData.code) {
      // 상위 코드의 코드가 변경되면 하위 코드의 parentCode 도 일괄 변경한다.
      console.log(`${code} !== ${codeData.code} = ${code !== codeData.code}`);
      await this.codeService.subCodeUpdate(codeData.code, code);
    }
    const response = data ? new StandardResponse<CodeEntity>({ data }) : new BaseResponse(Message.NOT_UPDATE_DATA, Constant.UPDATE_NOT_FOUND, 405, false);
    return response;
  }

  @Delete(':code')
  async delete(@Auth({ key: 'id', roles: [RoleConst.ADMIN] }) userId: number, @Param('code') code: string): Promise<StandardResponse<CodeEntity>> {
    const data = await this.codeService.delete(code);
    if (data.parentCode === Constant.ROOT) {
      await this.codeService.subCodeDelete(data.code);
    }
    const response = data ? new StandardResponse<CodeEntity>({ data }) : new BaseResponse(Message.NOT_UPDATE_DATA, Constant.UPDATE_NOT_FOUND, 405, false);
    return response;
  }
}
