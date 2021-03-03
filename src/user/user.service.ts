import { Injectable } from '@nestjs/common';
import UserEntity, { IUser } from '../entities/user.entity';
import { Constant } from '../common/constant';
import AccountEntity from '../entities/account.entity';
import { getConnection } from 'typeorm';
import SoldierEntity from '../entities/soldier.entity';

@Injectable()
export class UserService {
  async findAll(query: IUser): Promise<UserEntity[]> {
    try {
      const dataList = await UserEntity.find();
      return dataList;
    } catch (err) {
      throw err;
    }
  }

  async findOne(userId: number): Promise<UserEntity> {
    try {
      const data: UserEntity = await UserEntity.findOne({
        where: { id: userId },
        relations: ['accountList'],
      });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async create(data: UserEntity): Promise<UserEntity> {
    const userEntity = new UserEntity();
    Object.assign(userEntity, data);
    const createdData = await userEntity.save();
    console.log('createdData >>', createdData);
    return createdData;
  }

  async update(userEntity: UserEntity): Promise<UserEntity> {
    const updatedData = await userEntity.save();
    console.log('updatedData >>', updatedData);
    return updatedData;
  }

  async delete(userEntity: UserEntity): Promise<UserEntity> {
    const deletedData = await userEntity.save();
    console.log('deletedData >>', deletedData);
    await getConnection()
      .createQueryBuilder()
      .update(AccountEntity)
      .set({ status: Constant.DELETE })
      .where('user_id = :user_id', { user_id: userEntity.id })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .update(SoldierEntity)
      .set({ status: Constant.DELETE })
      .where('user_id = :user_id', { user_id: userEntity.id })
      .execute();
    return deletedData;
  }
}
