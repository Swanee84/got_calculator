import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BaseResponse, StandardResponse } from '../common/response.interface';
import AccountEntity from '../entities/account.entity';
import { AccountService } from './account.service';
import Auth from '../auth/auth.decorator';
import { Constant, Message, RoleConst } from '../common/constant';
import { IUser } from '../entities/user.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  async accountFindOne(@Param('id', new ParseIntPipe()) userId: number): Promise<StandardResponse<AccountEntity>> {
    const data = await this.accountService.findOne(userId);
    const response = new StandardResponse({ data });
    return Promise.resolve(response);
  }

  @Post()
  async create(
    @Auth({
      key: 'id',
    })
    userId: number,
    @Body() accountData: AccountEntity,
  ): Promise<StandardResponse<AccountEntity>> {
    const exist = await this.accountService.checkDuplicateAccount(accountData.userId, accountData.name);
    if (exist) {
      return Promise.resolve(new BaseResponse(Message.DUPLICATE_DATA, 'INSERT_FAIL', 409, false));
    }
    accountData.createdId = userId;
    const data = await this.accountService.create(accountData);
    const response = new StandardResponse({ data });
    return Promise.resolve(response);
  }

  @Patch(':id')
  async update(@Auth({}) user: IUser, @Param('id', new ParseIntPipe()) searchAccountId: number, @Body() accountData: AccountEntity): Promise<BaseResponse> {
    const userId = user.id;
    const role = user.role;
    const guildCode = user.guildCode;
    const accountEntity = await this.accountService.findOne(searchAccountId);
    if (
      userId != accountEntity.userId &&
      ([RoleConst.ADMIN, RoleConst.DUKE, RoleConst.MARQUIS].indexOf(role) < 0 || guildCode !== accountEntity.user.guildCode)
    ) {
      return Promise.resolve(new BaseResponse(Message.DISALLOWED_USER, Constant.UNAUTHORIZED, 401, false));
    }
    Object.assign(accountEntity, accountData);
    accountEntity.updatedId = userId;
    const data = await this.accountService.update(accountEntity);
    const response = data ? new StandardResponse({ data }) : new BaseResponse(Message.NOT_UPDATE_DATA, Constant.UPDATE_NOT_FOUND, 405, false);
    return Promise.resolve(response);
  }

  @Delete(':id')
  async delete(@Auth({}) user: IUser, @Param('id', new ParseIntPipe()) searchAccountId: number): Promise<BaseResponse> {
    const userId = user.id;
    const role = user.role;
    const guildCode = user.guildCode;
    const accountEntity = await this.accountService.findOne(searchAccountId);
    if (!accountEntity) {
      return Promise.resolve(new BaseResponse(Message.NOT_UPDATE_DATA, Constant.UPDATE_NOT_FOUND, 405, false));
    }
    if (
      userId != accountEntity.userId &&
      ([RoleConst.ADMIN, RoleConst.DUKE, RoleConst.MARQUIS].indexOf(role) < 0 || guildCode !== accountEntity.user.guildCode)
    ) {
      return Promise.resolve(new BaseResponse(Message.DISALLOWED_USER, Constant.UNAUTHORIZED, 401, false));
    }
    accountEntity.updatedId = userId;
    accountEntity.status = Constant.DELETE;
    const data = await this.accountService.delete(accountEntity);
    const response = data ? new StandardResponse({ data }) : new BaseResponse(Message.NOT_DELETE_DATA, Constant.DELETE_NOT_FOUND, 405, false);
    return Promise.resolve(response);
  }
}
