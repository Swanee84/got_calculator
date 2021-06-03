import { Injectable } from '@nestjs/common';
import { Constant } from '../common/constant';
import { CodeEntity } from '../entities/code.entity';
import { getConnection } from 'typeorm';

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
    if (data.parentCode === Constant.ROOT && toUpdateData.status != data.status) {
      await getConnection()
        .createQueryBuilder()
        .update(CodeEntity)
        .set({ status: data.status })
        .where('parent_code = :parentCode', { parentCode: data.code })
        .execute();
    }
    return updatedData;
  }

  async delete(code: string): Promise<CodeEntity> {
    const toDeleteData = await CodeEntity.findOne({ code });
    const deletedData = await toDeleteData.remove();
    return deletedData;
  }

  async subCodeUpdate(parentCode: string, originParentCode: string): Promise<boolean> {
    await getConnection()
      .createQueryBuilder()
      .update(CodeEntity)
      .set({ parentCode })
      .where('parent_code = :parentCode', { parentCode: originParentCode })
      .execute();

    return true;
  }

  async subCodeDelete(parentCode: string): Promise<boolean> {
    const updateResult = await getConnection()
      .createQueryBuilder()
      .update(CodeEntity)
      .set({ status: Constant.DELETE })
      .where('parent_code = :parentCode', { parentCode: parentCode })
      .execute();
    console.log(updateResult);
    return true;
  }
}
