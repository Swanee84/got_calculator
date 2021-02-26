import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { hash } from 'argon2';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { BaseResponse, StandardResponse } from '../common/response.interface';
import { Constant, Message, RoleConst } from '../common/constant';
import Auth from '../auth/auth.decorator';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import UserEntity, { IUser } from '../entities/user.entity';
import AccountEntity from '../entities/account.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post('signIn')
  async signIn(@Body() userData: { email: string; password: string }): Promise<StandardResponse<string>> {
    const password = await hash(userData.password);
    console.log('password >> ', password);
    const user = await this.authService.signIn(userData.email, userData.password);
    if (!user) {
      throw new HttpException({ user: 'not found' }, 401);
    }
    const token = this.authService.generateToken(user);
    const response = new StandardResponse({ data: token });
    return Promise.resolve(response);
  }

  @Get('tokenRefresh') // @Headers('authorization') authorization: string
  async tokenRefresh(@Auth() user: IUser): Promise<StandardResponse<string>> {
    const token = this.authService.generateToken(user);
    const response = new StandardResponse({ data: token });
    return Promise.resolve(response);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) userId: number): Promise<StandardResponse<UserEntity>> {
    const data = await this.userService.findOne(userId);
    const response = new StandardResponse({ data });
    return Promise.resolve(response);
  }

  @Post()
  async create(
    @Auth({
      key: 'id',
      roles: [RoleConst.ADMIN, RoleConst.DUKE, RoleConst.MARQUIS],
    })
    userId: number,
    @Body() userData: UserEntity,
  ): Promise<StandardResponse<UserEntity>> {
    userData.createdId = userId;
    const data = await this.userService.create(userData);
    const response = new StandardResponse({ data });
    return Promise.resolve(response);
  }

  @Patch(':id')
  async update(@Auth({}) user: IUser, @Param('id', new ParseIntPipe()) searchUserId: number, @Body() userData: UserEntity): Promise<BaseResponse> {
    const userId = user.id;
    const role = user.role;
    if (userId != searchUserId && [RoleConst.ADMIN, RoleConst.DUKE, RoleConst.MARQUIS].indexOf(role) < 0) {
      return Promise.resolve(new BaseResponse(Message.DISALLOWED_USER, Constant.UNAUTHORIZED, 401, false));
    }
    userData.updatedId = userId;
    const data = await this.userService.update(searchUserId, userData);
    const response = data ? new StandardResponse({ data }) : new BaseResponse(Message.NOT_UPDATE_DATA, Constant.UPDATE_NOT_FOUND, 405, false);
    return Promise.resolve(response);
  }

  @Delete(':id')
  async delete(@Auth({}) user: IUser, @Param('id', new ParseIntPipe()) searchUserId: number): Promise<BaseResponse> {
    const userId = user.id;
    const role = user.role;
    if (userId != searchUserId && [RoleConst.ADMIN, RoleConst.DUKE, RoleConst.MARQUIS].indexOf(role) < 0) {
      return Promise.resolve(new BaseResponse(Message.DISALLOWED_USER, Constant.UNAUTHORIZED, 401, false));
    }
    const data = await this.userService.delete(userId, searchUserId);
    const response = data ? new StandardResponse({ data }) : new BaseResponse(Message.NOT_DELETE_DATA, Constant.DELETE_NOT_FOUND, 405, false);
    return Promise.resolve(response);
  }
}
