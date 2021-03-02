import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { verify } from 'argon2';
import { getConnection } from 'typeorm';

import UserEntity, { IUser } from '../entities/user.entity';
import { SECRET } from '../config';

import { SignInLogModel } from '../common/logging.schema';

@Injectable()
export class AuthService {
  // constructor(
  //   @InjectRepository(UserEntity)
  //   private readonly userRepository: Repository<UserEntity>
  // ) {}

  async signIn(email: string, password: string): Promise<IUser> {
    const user = await UserEntity.findOne({
      select: ['id', 'email', 'password', 'name', 'role', 'guildCode', 'lastSignAt'],
      where: {
        email,
        status: 'NORMAL',
      },
    });
    if (!user) {
      throw new HttpException({ status: 401, message: 'Email Not Found' }, 401);
      return null;
    }

    if (await verify(user.password, password)) {
      const signLog = new SignInLogModel({ userId: user.id });
      await signLog.save();
      await getConnection().createQueryBuilder().update(UserEntity).set({ lastSignAt: Date() }).where('id = :id', { id: user.id }).execute();

      return user.getInterface();
    } else {
      throw new HttpException({ status: 401, message: 'Invalid Password' }, 401);
    }

    return null;
  }

  async findById(id: number): Promise<IUser> {
    const user = await UserEntity.findOne(id);

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return user.getInterface();
  }

  async findByIdFromRedis(id: number): Promise<IUser> {
    const user = await UserEntity.findOne(id); // redis 로 변경해야 한다.

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return user.getInterface();
  }

  public generateToken(user: IUser) {
    // const today = new Date()
    // const exp = new Date(today)
    // exp.setDate(today.getDate() + 60)
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    try {
      const token: string = sign(payload, SECRET, { expiresIn: 60 * 60 * 24 * 7 }); // 토큰 유효 기간 7일
      console.log('generated token : ', token);
      return token;
    } catch (e) {
      console.log(e);
    }
    return null;
  }
}
