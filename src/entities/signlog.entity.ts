import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, Index, CreateDateColumn } from 'typeorm';

@Entity('sign_log')
@Index(['lastSignAt', 'userId'])
export class SignLog extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '로그인 기록 계정' })
  id!: number;

  @Column({ type: 'int', nullable: false, comment: '사용자 계정' })
  userId!: number;

  @Column({ type: 'varchar', length: 8, nullable: false, comment: '로그인 종류', default: 'SIGN_IN' })
  @Index()
  category?: string;

  @Column({ type: 'date', nullable: true, comment: '로그인 일', default: () => 'CURRENT_DATE' })
  @Index()
  signDate?: Date;

  @Column({ type: 'time', nullable: true, comment: '로그인 시간', default: () => 'CURRENT_TIME' })
  signTime?: string;

  @CreateDateColumn({ type: 'datetime', nullable: true, comment: '마지막 로그인 일시' })
  @Index()
  lastSignAt?: string;
}
