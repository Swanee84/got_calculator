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

  async create(data: SoldierEntity): Promise<SoldierEntity> {
    const createdData = await data.save();
    console.log('createdData >>', createdData);
    return createdData;
  }

  async update(userId: number, data: SoldierEntity): Promise<SoldierEntity> {
    const toUpdateData = await SoldierEntity.findOne({ id: userId });
    if (!toUpdateData) {
      return null;
    }
    const updated = Object.assign(toUpdateData, data);
    const updatedData = await updated.save();
    console.log('updatedData >>', updatedData);
    return updatedData;
  }

  async delete(userId: number, searchUserId: number): Promise<SoldierEntity> {
    const toDeleteData = await SoldierEntity.findOne({ id: searchUserId });
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
