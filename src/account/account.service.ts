import { Injectable } from '@nestjs/common';
import AccountEntity, { IAccount } from '../entities/account.entity';
import { Constant, SoldierConst } from '../common/constant';
import SoldierEntity from '../entities/soldier.entity';
import { getConnection } from 'typeorm';

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
    const count = await AccountEntity.count({ where: { userId, name, status: Constant.NORMAL } });
    return count > 0;
  }

  async findOne(accountId: number): Promise<AccountEntity> {
    try {
      const data: AccountEntity = await AccountEntity.findOne({
        where: { id: accountId },
        relations: ['soldierList', 'user'],
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

    // 인게임 계정을 등록하면 4개 병종정보를 기본으로 저장한다.
    if (!createdData.soldierList) {
      createdData.soldierList = [];
    }

    const accountId = createdData.id;
    const userId = createdData.userId;
    const createdId = createdData.createdId;
    const soldiers = SoldierConst.soldiers;

    for (const value of soldiers) {
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

  async update(toUpdateData: AccountEntity): Promise<AccountEntity> {
    const updatedData = await toUpdateData.save();
    console.log('updatedData >>', updatedData);
    return updatedData;
  }

  async delete(toDeleteData: AccountEntity): Promise<AccountEntity> {
    const deletedData = await toDeleteData.save();
    await getConnection()
      .createQueryBuilder()
      .update(SoldierEntity)
      .set({ status: Constant.DELETE })
      .where('account_id = :account_id', { account_id: toDeleteData.id })
      .execute(); // account 에 속해있는 soldier 들의 status 도 DELETE 로 변경한다. 좀 더 깔끔한 방법 없나?
    console.log('deletedData >>', deletedData);
    return deletedData;
  }
}
