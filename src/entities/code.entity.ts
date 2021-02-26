import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import BasicEntity from './basic.entity';

@Entity('code', { orderBy: { sort: 'ASC' } })
@Index(['parentCode', 'code'])
@Index(['code', 'status'])
export class CodeEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '코드 상세 계정' })
  id!: number;

  @Column({ type: 'varchar', length: 8, nullable: false, comment: '상위 코드' })
  parentCode!: string;

  @Column({ type: 'varchar', length: 8, nullable: false, comment: '코드' })
  code!: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '코드 이름' })
  codeName?: string;

  @Column({ type: 'varchar', length: 16, nullable: true, comment: '값 1' })
  value1?: string;

  @Column({ type: 'varchar', length: 16, nullable: true, comment: '값 2' })
  value2?: string;

  @Column({ type: 'int', nullable: true, comment: '정렬' })
  sort?: number;
}
