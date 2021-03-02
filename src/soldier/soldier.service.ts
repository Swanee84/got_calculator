import { Injectable } from '@nestjs/common';
import SoldierEntity, { ISoldier } from '../entities/soldier.entity';
import UserEntity from '../entities/user.entity';
import { Constant } from '../common/constant';

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
      relations: ['user'],
    });
    return data;
  }

  async create(data: SoldierEntity): Promise<SoldierEntity> {
    const createdData = await data.save();
    console.log('createdData >>', createdData);
    return createdData;
  }

  async update(toUpdateData: SoldierEntity): Promise<SoldierEntity> {
    const updatedData = await toUpdateData.save();
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
    console.log('deletedData >>', deletedData);
    return deletedData;
  }
}
