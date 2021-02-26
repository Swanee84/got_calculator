import { Injectable } from '@nestjs/common';
import UserEntity, { IUser } from '../entities/user.entity';
import { Constant } from '../common/constant';
import AccountEntity from '../entities/account.entity';

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

  async accountFindOne(accountId: number): Promise<AccountEntity> {
    try {
      const data: AccountEntity = await AccountEntity.findOne({
        where: { id: accountId },
        relations: ['soldierList'],
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

  async update(userId: number, data: UserEntity): Promise<UserEntity> {
    const toUpdateData = await UserEntity.findOne({ id: userId });
    if (!toUpdateData) {
      return null;
    }
    const updated = Object.assign(toUpdateData, data);
    const updatedData = await updated.save();
    console.log('updatedData >>', updatedData);
    return updatedData;
  }

  async delete(userId: number, searchUserId: number): Promise<UserEntity> {
    const toDeleteData = await UserEntity.findOne({ id: searchUserId });
    if (!toDeleteData) {
      return null;
    }
    toDeleteData.updatedId = userId;
    toDeleteData.status = Constant.DELETE;
    const deletedData = await toDeleteData.save();
    console.log('deletedData >>', deletedData);
    return deletedData;
  }
}
