import { Injectable } from '@nestjs/common';
import AccountEntity, { IAccount } from '../entities/account.entity';
import { Constant } from '../common/constant';
import SoldierEntity from '../entities/soldier.entity';

@Injectable()
export class AccountService {
  async findAll(query: IAccount): Promise<AccountEntity[]> {
    try {
      const dataList = await AccountEntity.find(query);
      return dataList;
    } catch (err) {
      throw err;
    }
  }

  async checkDuplicateAccount(userId: number, name: string): Promise<boolean> {
    const count = await AccountEntity.count({ where: { userId, name } });
    return count > 0;
  }

  async findOne(accountId: number): Promise<AccountEntity> {
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

  async create(data: AccountEntity): Promise<AccountEntity> {
    const accountEntity = new AccountEntity();
    Object.assign(accountEntity, data);
    const createdData = await accountEntity.save();
    console.log('createdData >>', createdData);
    if (!createdData.soldierList) {
      createdData.soldierList = [];
    }

    const accountId = createdData.id;
    const userId = createdData.userId;
    const createdId = createdData.createdId;
    for (const value of Constant.soldiers) {
      const solderEntity = new SoldierEntity();
      solderEntity.accountId = accountId;
      solderEntity.userId = userId;
      solderEntity.soldierCode = value;
      solderEntity.status = 'NORMAL';
      solderEntity.createdId = createdId;

      const isEmpty = (await SoldierEntity.count({ where: { accountId, soldierCode: value } })) == 0;
      if (isEmpty) {
        const solderData = await solderEntity.save();
        createdData.soldierList.push(solderData);
      }
    }

    return createdData;
  }

  async update(accountId: number, data: AccountEntity): Promise<AccountEntity> {
    const toUpdateData = await AccountEntity.findOne({ id: accountId });
    if (!toUpdateData) {
      return null;
    }
    const updated = Object.assign(toUpdateData, data);
    const updatedData = await updated.save();
    console.log('updatedData >>', updatedData);
    return updatedData;
  }

  async delete(userId: number, searchAccountId: number): Promise<AccountEntity> {
    const toDeleteData = await AccountEntity.findOne({ id: searchAccountId });
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
