import { BaseEntity, Column, CreateDateColumn, Index, UpdateDateColumn } from 'typeorm';
import { IUser } from './user.entity';

export default abstract class BasicEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 8, nullable: true, comment: '상태' })
  status!: string;
  @Column({ type: 'int', nullable: true, comment: '등록 계정' })
  createdId?: number;
  @Column({ type: 'int', nullable: true, comment: '수정 계정' })
  updatedId?: number;

  @CreateDateColumn({ type: 'datetime', nullable: true, comment: '등록 일시' })
  @Index()
  createdAt?: Date;
  @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '수정 일시' })
  updatedAt?: Date;

  getInterface(): IBasic {
    return {
      status: this.status,
      createdAt: this.createdAt,
      createdId: this.createdId,
      updatedAt: this.updatedAt,
      updatedId: this.updatedId,
    };
  }
}

export interface IBasic {
  status?: string;
  createdId?: number;
  updatedId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
