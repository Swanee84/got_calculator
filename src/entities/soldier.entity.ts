import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import BasicEntity, { IBasic } from './basic.entity';
import AccountEntity from './account.entity';

@Entity('soldier')
export default class SoldierEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '병종 정보 PK' })
  id!: number;

  @Column({ type: 'int', nullable: false, comment: 'user.id FK' })
  @Index()
  userId!: number;

  @Column({ type: 'int', nullable: false, comment: 'account.id FK' })
  @Index()
  accountId!: number;

  @Column({ type: 'varchar', length: 8, nullable: true, comment: '병종 코드' })
  soldierCode?: string;

  @Column({ type: 'int', nullable: true, comment: '공격' })
  attack?: number;

  @Column({ type: 'int', nullable: true, comment: '방어' })
  guard?: number;

  @Column({ type: 'int', nullable: true, comment: '생명' })
  heart?: number;

  @Column({ type: 'int', nullable: true, comment: '중급스킬' })
  skill?: number;

  @ManyToOne((type) => AccountEntity, (account) => account.soldierList, { cascade: true })
  @JoinColumn({ name: 'account_id' })
  account!: AccountEntity;

  getInterface(): ISoldier {
    const iBasic = super.getInterface();

    return {
      id: this.id,
      userId: this.userId,
      accountId: this.accountId,
      soldierCode: this.soldierCode,
      attack: this.attack,
      guard: this.guard,
      heart: this.heart,
      skill: this.skill,
      ...iBasic,
    };
  }
}

export interface ISoldier extends IBasic {
  id?: number;
  userId?: number;
  accountId?: number;
  soldierCode?: string;
  attack?: number;
  guard?: number;
  heart?: number;
  skill?: number;
}
