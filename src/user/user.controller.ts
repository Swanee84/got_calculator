import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { hash } from 'argon2';
import { UserService } from './user.service';
import UserEntity, { IUser } from '../entities/user.entity';
import { StandardResponse } from '../common/response.interface';
import AccountEntity from '../entities/account.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import Auth from '../auth/auth.decorator';
import { AuthService } from '../auth/auth.service';

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
    const response = new StandardResponse<string>({ data: token });
    return Promise.resolve(response);
  }

  @Get('tokenRefresh') // @Headers('authorization') authorization: string
  async tokenRefresh(@Auth() user: IUser): Promise<StandardResponse<string>> {
    const token = this.authService.generateToken(user);
    const response = new StandardResponse<string>({ data: token });
    return Promise.resolve(response);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) userId: number): Promise<StandardResponse<UserEntity>> {
    const data = await this.userService.findOne(userId);
    const response = new StandardResponse<UserEntity>({ data });
    return Promise.resolve(response);
  }

  @Get('account/:id')
  async accountFindOne(@Param('id', new ParseIntPipe()) userId: number): Promise<StandardResponse<AccountEntity>> {
    const data = await this.userService.accountFindOne(userId);
    const response = new StandardResponse<AccountEntity>({ data });
    return Promise.resolve(response);
  }
}
