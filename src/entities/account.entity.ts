import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, Index, OneToMany, ManyToOne, JoinColumn, JoinTable, UpdateDateColumn } from 'typeorm';
import BasicEntity, { IBasic } from './basic.entity';
import SoldierEntity from './soldier.entity';
import UserEntity from './user.entity';

@Entity('account')
export default class AccountEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '왕게임 내 계정 PK' })
  id!: number;

  @Column({ type: 'int', nullable: false, comment: 'user.id FK' })
  @Index()
  userId!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '왕게임 내 로드명' })
  name!: string;

  @Column({ type: 'int', nullable: true, comment: '주성 레벨' })
  castleLevel?: number;

  @Column({ type: 'int', nullable: true, comment: '기수홀 레벨' })
  holeLevel?: number;

  @Column({ type: 'int', nullable: true, comment: '집결 규모' })
  gatheringCount?: number;

  @Column({ type: 'varchar', length: 8, nullable: true, comment: '소속 길드' })
  guildCode?: string;

  @Column({ type: 'varchar', length: 8, nullable: true, comment: '계정 유형 코드' })
  typeCode?: string;

  @Column({ type: 'varchar', length: 8, nullable: true, comment: '계급 코드' })
  classCode?: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '마지막 정보 입력 일시' })
  lastUpdatedAt?: Date;

  @ManyToOne((type) => UserEntity, (user) => user.accountList, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @OneToMany((type) => SoldierEntity, (soldier) => soldier.account)
  @JoinTable({
    name: 'account_soldiers',
    joinColumn: {
      name: 'account',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'soldier',
      referencedColumnName: 'account_id',
    },
  })
  soldierList!: SoldierEntity[];

  getInterface(): IAccount {
    const iBasic = super.getInterface();

    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      castleLevel: this.castleLevel,
      holeLevel: this.holeLevel,
      gatheringCount: this.gatheringCount,
      typeCode: this.typeCode,
      classCode: this.classCode,
      ...iBasic,
    };
  }
}

export interface IAccount extends IBasic {
  id: number;
  userId: number;
  name: string;
  castleLevel?: number;
  holeLevel?: number;
  gatheringCount?: number;
  typeCode?: string;
  classCode?: string;
}
