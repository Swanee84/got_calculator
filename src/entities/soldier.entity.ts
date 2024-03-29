import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import BasicEntity, { IBasic } from './basic.entity';
import AccountEntity from './account.entity';
import UserEntity from './user.entity';

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

  @Column({ type: 'int', nullable: true, default: 5, comment: '병종 등급' })
  tier?: number;

  @Column({ type: 'int', nullable: true, default: 100, comment: '공격' })
  attack?: number;

  @Column({ type: 'int', nullable: true, default: 100, comment: '방어' })
  guard?: number;

  @Column({ type: 'int', nullable: true, default: 100, comment: '생명' })
  heart?: number;

  @Column({ type: 'int', nullable: true, default: 100, comment: '고급지휘관' })
  highCommander?: number;

  @Column({ type: 'int', nullable: true, default: 100, comment: '룰렛지휘관' })
  middleCommander?: number;

  @Column({ type: 'int', nullable: true, default: 0, comment: '중급스킬' })
  skill?: number;

  @Column({ type: 'int', nullable: true, default: 0, comment: '병종 전투력' })
  power?: number;

  @ManyToOne((type) => AccountEntity, (account) => account.soldierList, { cascade: true })
  @JoinColumn({ name: 'account_id' })
  account!: AccountEntity;

  @ManyToOne((type) => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

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
      highCommander: this.highCommander,
      middleCommander: this.middleCommander,
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
  highCommander?: number;
  middleCommander?: number;
  skill?: number;
}
