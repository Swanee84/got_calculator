import { Injectable } from '@nestjs/common';
import AccountEntity from '../entities/account.entity';
import { getRepository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import SoldierEntity from '../entities/soldier.entity';

@Injectable()
export class DashboardService {
  async dashboard(guildCode: string): Promise<any> {
    const recentlyUpdatedAccountList = await AccountEntity.find({
      select: ['name', 'lastUpdatedAt'],
      where: { lastUpdatedAt: MoreThanOrEqual('DATE_SUB(CURRENT_DATE, INTERVAL 3 DAY)'), guildCode: guildCode },
      relations: ['user'],
    });
    // SUBDATE(CURDATE(), 3) 으로 해도 되는데 밑줄 쳐지는게 싫어서...
    const oldUpdatedAccountList = await AccountEntity.find({
      select: ['name', 'lastUpdatedAt'],
      where: { lastUpdatedAt: LessThanOrEqual('DATE_SUB(CURRENT_DATE, INTERVAL 14 DAY)'), guildCode: guildCode },
    });

    const soldierList = await getRepository(SoldierEntity)
      .createQueryBuilder('s')
      .innerJoinAndSelect('s.account', 'a')
      .select(['s.soldierCode', 's.attack', 's.guard', 's.heart', 's.skill', 's.power', 's.tier', 'a.name', 'a.guildCode', 'a.typeCode', 'a.classCode'])
      .where('a.guild_code = :guildCode', { guildCode: guildCode })
      .orderBy({ 's.power': 'DESC', 's.soldierCode': 'ASC' })
      .getMany();

    const rankingBySoldier = { INFANTRY: [], CAVALRY: [], SPEARMAN: [], ARCHER: [] };
    for (const soldier of soldierList) {
      const soldierCode = soldier.soldierCode;
      rankingBySoldier[soldierCode].push(soldier);
    }

    return Promise.resolve({ recently: recentlyUpdatedAccountList, old: oldUpdatedAccountList, ranking: rankingBySoldier });
  }
}
