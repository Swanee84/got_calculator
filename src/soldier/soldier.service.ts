import { Injectable } from '@nestjs/common';
import SoldierEntity, { ISoldier } from '../entities/soldier.entity';
import UserEntity from '../entities/user.entity';
import { Constant } from '../common/constant';
import AccountEntity from '../entities/account.entity';

@Injectable()
export class SoldierService {
  async findAll(query: ISoldier): Promise<SoldierEntity[]> {
    try {
      const dataList = await SoldierEntity.find({
        where: query,
      });
      return dataList;
    } catch (err) {
      throw err;
    }
  }

  async findOne(searchSoldierId: number): Promise<SoldierEntity> {
    const data = await SoldierEntity.findOne({
      where: {
        id: searchSoldierId,
      },
      relations: ['account', 'user'],
    });
    return data;
  }

  async create(data: SoldierEntity): Promise<SoldierEntity> {
    const createdData = await data.save();
    console.log('createdData >>', createdData);
    return createdData;
  }

  async update(toUpdateData: SoldierEntity): Promise<SoldierEntity> {
    const tier = toUpdateData.tier;
    const attack = toUpdateData.attack;
    const guard = toUpdateData.guard;
    const heart = toUpdateData.heart;
    const skill = toUpdateData.skill;

    const power = tier * 200 + attack + guard + heart + skill * 35;
    toUpdateData.power = power;

    // 병종정보를 갱신하면 account 에 현재 일시를 별도로 저장한다.
    const updatedData = await toUpdateData.save();
    const accountEntity = new AccountEntity();
    accountEntity.id = toUpdateData.accountId;
    accountEntity.lastUpdatedAt = new Date();
    await accountEntity.save();

    return updatedData;
  }

  async delete(userId: number, soldierId: number): Promise<SoldierEntity> {
    const toDeleteData = await SoldierEntity.findOne({ id: soldierId });
    if (!toDeleteData) {
      return null;
    }
    toDeleteData.updatedId = userId;
    toDeleteData.status = Constant.DELETE;
    const deletedData = await toDeleteData.save();
    return deletedData;
  }
}
