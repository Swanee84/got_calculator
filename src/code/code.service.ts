import { Injectable } from '@nestjs/common';
import { Constant } from '../common/constant';
import { CodeEntity } from '../entities/code.entity';
import SoldierEntity from '../entities/soldier.entity';

@Injectable()
export class CodeService {
  async findAll(parentCode?: string): Promise<CodeEntity[]> {
    const query: { parentCode?: string } = {};
    if (parentCode) {
      query.parentCode = parentCode;
    }
    try {
      const dataList = await CodeEntity.find({
        where: query,
      });
      return dataList;
    } catch (err) {
      throw err;
    }
  }

  async create(data: CodeEntity): Promise<CodeEntity> {
    const code = new CodeEntity();
    Object.assign(code, data);
    const createdData = await code.save();
    return createdData;
  }

  async update(code: string, data: CodeEntity): Promise<CodeEntity> {
    const toUpdateData = await CodeEntity.findOne({ code });
    const updated = Object.assign(toUpdateData, data);
    const updatedData = await updated.save();
    return updatedData;
  }

  async delete(code: string): Promise<CodeEntity> {
    const data = new CodeEntity();
    data.code = code;
    data.status = Constant.DELETE;
    const deletedData = await data.save();
    return deletedData;
  }
}
