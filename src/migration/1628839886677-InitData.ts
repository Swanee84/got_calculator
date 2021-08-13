import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitData1628839886677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO code (parent_code, code, code_name, sort, status, created_id, value1)
        VALUES ('ROOT', 'STATUS', '상태 코드', 1, 'NORMAL', 0, null)
             , ('ROOT', 'GUILD', '길드 코드', 2, 'NORMAL', 0, null)
             , ('ROOT', 'SOLDIER', '병종 코드', 3, 'NORMAL', 0, null)
             , ('ROOT', 'ROLE', '권한 코드', 4, 'NORMAL', 0, null)
             , ('ROOT', 'ACC_TYPE', '계정 유형 코드', 5, 'NORMAL', 0, null)
             , ('ROOT', 'CLASS', '계급 코드', 6, 'NORMAL', 0, null)
             , ('STATUS', 'NORMAL', '사용', 1, 'NORMAL', 0, null)
             , ('STATUS', 'DELETE', '삭제', 2, 'NORMAL', 0, null)
             , ('STATUS', 'HIDDEN', '숨김', 3, 'NORMAL', 0, null)
             , ('STATUS', 'SUSPEND', '휴면', 4, 'NORMAL', 0, null)
             , ('GUILD', 'KPOp', 'Bless', 1, 'NORMAL', 0, 'MAIN')
             , ('GUILD', 'KPOP', '좋은사람들', 2, 'NORMAL', 0, 'MAIN')
             , ('GUILD', 'KPO1', '좋은사람들 수호', 3, 'NORMAL', 0, 'MAIN')
             , ('GUILD', 'VPOP', 'VVIP Family', 4, 'NORMAL', 0, 'SUB')
             , ('GUILD', 'XPOP', 'TPHL', 5, 'NORMAL', 0, 'MAIN')
             , ('SOLDIER', 'INFANTRY', '보병', 1, 'NORMAL', 0, null)
             , ('SOLDIER', 'CAVALRY', '기병', 2, 'NORMAL', 0, null)
             , ('SOLDIER', 'SPEARMAN', '창병', 3, 'NORMAL', 0, null)
             , ('SOLDIER', 'ARCHER', '궁병', 4, 'NORMAL', 0, null)
             , ('ROLE', 'STANDARD', '일반', 1, 'NORMAL', 0, null)
             , ('ROLE', 'SUPER', '간부', 2, 'NORMAL', 0, null)
             , ('ROLE', 'ADMIN', '관리자', 3, 'NORMAL', 0, null)
             , ('ACC_TYPE', 'MAIN', '주 계정', 1, 'NORMAL', 0, null)
             , ('ACC_TYPE', 'SUB', '부 계정', 2, 'NORMAL', 0, null)
             , ('CLASS', 'DUKE', '공작', 1, 'NORMAL', 0, null)
             , ('CLASS', 'MARQUIS', '후작', 2, 'NORMAL', 0, null)
             , ('CLASS', 'COUNT', '백작', 3, 'NORMAL', 0, null)
             , ('CLASS', 'BARON', '남작', 4, 'NORMAL', 0, null)
             , ('CLASS', 'KNIGHT', '기사', 5, 'NORMAL', 0, null)
    `);

    await queryRunner.query(`
    INSERT INTO user (email, password, guild_code, role, status, created_id)
    VALUES ('Admin', '$argon2i$v=19$m=4096,t=3,p=1$itNsaUpxpz/c5TDkBIuVPA$Scp4CNrlfeQfORAs5XGew+1L/VJAUgZ6XV5QG5sRgwo', 'KPOp', 'ADMIN', 'NORMAL', 0)
         , ('테스트간부1', '$argon2i$v=19$m=4096,t=3,p=1$itNsaUpxpz/c5TDkBIuVPA$Scp4CNrlfeQfORAs5XGew+1L/VJAUgZ6XV5QG5sRgwo', 'KPOp', 'SUPER', 'NORMAL', 0)
         , ('테스트간부2', '$argon2i$v=19$m=4096,t=3,p=1$itNsaUpxpz/c5TDkBIuVPA$Scp4CNrlfeQfORAs5XGew+1L/VJAUgZ6XV5QG5sRgwo', 'KPOp', 'SUPER', 'NORMAL', 0)
         , ('테스트간부3', '$argon2i$v=19$m=4096,t=3,p=1$itNsaUpxpz/c5TDkBIuVPA$Scp4CNrlfeQfORAs5XGew+1L/VJAUgZ6XV5QG5sRgwo', 'KPOp', 'SUPER', 'NORMAL', 0)
         , ('테스트가문원1', '$argon2i$v=19$m=4096,t=3,p=1$itNsaUpxpz/c5TDkBIuVPA$Scp4CNrlfeQfORAs5XGew+1L/VJAUgZ6XV5QG5sRgwo', 'KPOp', 'STANDARD', 'NORMAL', 0)
         , ('테스트가문원2', '$argon2i$v=19$m=4096,t=3,p=1$itNsaUpxpz/c5TDkBIuVPA$Scp4CNrlfeQfORAs5XGew+1L/VJAUgZ6XV5QG5sRgwo', 'KPOp', 'STANDARD', 'NORMAL', 0)
         , ('테스트가문원3', '$argon2i$v=19$m=4096,t=3,p=1$itNsaUpxpz/c5TDkBIuVPA$Scp4CNrlfeQfORAs5XGew+1L/VJAUgZ6XV5QG5sRgwo', 'KPOp', 'STANDARD', 'NORMAL', 0)
         , ('테스트가문원4', '$argon2i$v=19$m=4096,t=3,p=1$itNsaUpxpz/c5TDkBIuVPA$Scp4CNrlfeQfORAs5XGew+1L/VJAUgZ6XV5QG5sRgwo', 'KPOp', 'STANDARD', 'NORMAL', 0);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // empty
    await queryRunner.clearTable('code');
  }
}
