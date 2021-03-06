import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import BasicEntity, { IBasic } from './basic.entity';
import AccountEntity from './account.entity';
import { hash } from 'argon2';

@Entity('user')
@Index(['email', 'status'])
export default class UserEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '사용자 PK' })
  id!: number;

  @Column({ type: 'varchar', length: 200, nullable: true, comment: '로그인 아이디' })
  @Index()
  email!: string;

  @Column({ type: 'varchar', length: 200, nullable: false, comment: '로그인 비밀번호', select: false })
  password?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '이름' })
  @Index()
  name!: string;

  @Column({ type: 'varchar', length: 8, nullable: true, comment: '가문 코드' })
  @Index()
  guildCode?: string;

  @Column({ type: 'varchar', length: 8, nullable: false, comment: '사용자 권한' })
  role!: string; // 권한

  @Column({ type: 'datetime', nullable: true, comment: '마지막 로그인 일시' })
  @Index()
  lastSignAt?: string;

  @OneToMany((type) => AccountEntity, (account) => account.user)
  accountList!: AccountEntity[];

  getInterface(): IUser {
    const iBasic = super.getInterface();

    return {
      id: this.id,
      email: this.email,
      name: this.name,
      guildCode: this.guildCode,
      role: this.role,
      ...iBasic,
    };
  }
}

export interface IUser extends IBasic {
  id: number;
  email?: string;
  name?: string;
  guildCode?: string;
  role: string;
}
