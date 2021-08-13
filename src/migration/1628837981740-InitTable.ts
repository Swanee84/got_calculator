// import { MigrationInterface, QueryRunner, TableForeignKey, TableIndex } from 'typeorm';
//
// export class InitTable1628837981740 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     console.log('마이그레이션을 실행하자');
//     if (!(await queryRunner.hasTable('code'))) {
//       console.log('코드 테이블 생성');
//       await queryRunner.query(`
//       CREATE TABLE code
//       (
//         id          INT         NOT NULL AUTO_INCREMENT COMMENT 'PK',
//         parent_code VARCHAR(8)  NULL COMMENT '상위코드. 1차레벨 코드는 ''ROOT''',
//         code        VARCHAR(8)  NULL COMMENT '코드값',
//         code_name   VARCHAR(50) NULL COMMENT '코드 이름',
//         value1      VARCHAR(16) NULL COMMENT '값1',
//         value2      VARCHAR(16) NULL COMMENT '값2',
//         sort        SMALLINT    NULL COMMENT '순서',
//         status      VARCHAR(8)  NULL COMMENT '상태',
//         created_id  INT         NULL COMMENT '데이터 생성 계정',
//         updated_id  INT         NULL COMMENT '데이터 수정 계정',
//         created_at  DATETIME    NULL DEFAULT CURRENT_TIMESTAMP COMMENT '데이터 생성 일시',
//         updated_at  DATETIME    NULL COMMENT '데이터 수정 일시',
//         CONSTRAINT PK_code_group PRIMARY KEY (id)
//       ) COMMENT '코드 정보 테이블';
//     `);
//       await queryRunner.createIndex(
//         'code',
//         new TableIndex({
//           name: 'IX_code_1',
//           columnNames: ['code'],
//         }),
//       );
//       await queryRunner.createIndex(
//         'code',
//         new TableIndex({
//           name: 'IX_code_2',
//           columnNames: ['parent_code', 'code'],
//         }),
//       );
//     } else {
//       console.log('코드 테이블이 있다.');
//     }
//
//     if (!(await queryRunner.hasTable('user'))) {
//       console.log('유저 테이블 생성');
//       await queryRunner.query(`
//       CREATE TABLE user
//       (
//         id          INT            NOT NULL    AUTO_INCREMENT COMMENT 'PK',
//         email       VARCHAR(45)    NULL        COMMENT '로그인 아이디',
//         password    VARCHAR(45)    NULL        COMMENT '로그인 비밀번호',
//         guild_code  VARCHAR(8)     NULL        DEFAULT 'ONEB' COMMENT '가문코드',
//         role        VARCHAR(8)     NULL        DEFAULT 'KNIGHT' COMMENT '권한',
//         status      VARCHAR(8)     NULL        COMMENT '상태',
//         created_id  INT            NULL        COMMENT '데이터 생성 계정',
//         updated_id  INT            NULL        COMMENT '데이터 수정 계정',
//         created_at  DATETIME       NULL        DEFAULT CURRENT_TIMESTAMP COMMENT '데이터 생성 일시',
//         updated_at  DATETIME       NULL        COMMENT '데이터 수정 일시',
//         CONSTRAINT PK_user PRIMARY KEY (id)
//       ) COMMENT '시스템 사용자 테이블';
//     `);
//       await queryRunner.createIndex(
//         'user',
//         new TableIndex({
//           name: 'IX_user_1',
//           columnNames: ['email'],
//         }),
//       );
//       await queryRunner.createIndex(
//         'user',
//         new TableIndex({
//           name: 'IX_user_2',
//           columnNames: ['guild_code'],
//         }),
//       );
//     } else {
//       console.log('유저 테이블이 있다.');
//     }
//
//     if (!(await queryRunner.hasTable('account'))) {
//       console.log('계정 테이블 생성');
//       await queryRunner.query(`
//       CREATE TABLE account
//       (
//         id               INT            NOT NULL    AUTO_INCREMENT COMMENT '왕게임 내 계정 PK',
//         user_id          INT            NULL        COMMENT 'user.id FK',
//         name             VARCHAR(45)    NULL        COMMENT '왕게임 내 로드명',
//         castle_level     INT            NULL        COMMENT '주성 레벨',
//         hole_level       INT            NULL        COMMENT '기수홀 레벨',
//         gathering_count  INT            NULL        COMMENT '집결 규모',
//         class_code       VARCHAR(8)     NULL        COMMENT '계급 코드',
//         type_code        VARCHAR(8)     NULL        COMMENT '계정 유형 코드',
//         status           VARCHAR(8)     NULL        COMMENT '상태',
//         created_id       INT            NULL        COMMENT '데이터 생성 계정',
//         updated_id       INT            NULL        COMMENT '데이터 수정 계정',
//         created_at       DATETIME       NULL        DEFAULT CURRENT_TIMESTAMP COMMENT '데이터 생성 일시',
//         updated_at       DATETIME       NULL        COMMENT '데이터 수정 일시',
//         CONSTRAINT PK_account PRIMARY KEY (id)
//       ) COMMENT '왕좌의 게임 내 계정 테이블';
//     `);
//       await queryRunner.createIndex(
//         'account',
//         new TableIndex({
//           name: 'IX_account_1',
//           columnNames: ['user_id'],
//         }),
//       );
//
//       await queryRunner.createForeignKey(
//         'account',
//         new TableForeignKey({
//           columnNames: ['user_id'],
//           referencedTableName: 'user',
//           referencedColumnNames: ['id'],
//           onDelete: 'CASCADE',
//         }),
//       );
//     } else {
//       console.log('계정 테이블이 있다.');
//     }
//
//     if (!(await queryRunner.hasTable('soldier'))) {
//       console.log('병종 테이블 생성');
//       await queryRunner.query(`
//       CREATE TABLE soldier
//       (
//         id                INT           NOT NULL    AUTO_INCREMENT COMMENT 'PK',
//         user_id           INT           NULL        COMMENT 'user.id FK',
//         account_id        INT           NULL        COMMENT 'account.id FK',
//         soldier_code      VARCHAR(8)    NULL        COMMENT '병종 코드',
//         attack            INT           NULL        DEFAULT 0 COMMENT '공격력',
//         guard             INT           NULL        DEFAULT 0 COMMENT '방어력',
//         heart             INT           NULL        DEFAULT 0 COMMENT '생명력',
//         high_commander    INT           NULL        DEFAULT 0 COMMENT '돈 엄청 처먹는 지휘관(아리아, 존스노우, 서세이, 제이미)',
//         middle_commander  INT           NULL        DEFAULT 0 COMMENT '룰렛을 돌려 구하는 지휘관',
//         skill             INT           NULL        DEFAULT 0 COMMENT '함락, 리덕, 연타, 강궁',
//         power             INT           NULL        DEFAULT 0 COMMENT '전투력',
//         status            VARCHAR(8)    NULL        COMMENT '상태',
//         created_id        INT           NULL        COMMENT '데이터 생성 계정',
//         updated_id        INT           NULL        COMMENT '데이터 수정 계정',
//         created_at        DATETIME      NULL        DEFAULT CURRENT_TIMESTAMP COMMENT '데이터 생성 일시',
//         updated_at        DATETIME      NULL        COMMENT '데이터 수정 일시',
//         CONSTRAINT PK_soldier PRIMARY KEY (id)
//       ) COMMENT '계정의 각 병종 정보 테이블';
//     `);
//       await queryRunner.createIndex(
//         'soldier',
//         new TableIndex({
//           name: 'IX_soldier_1',
//           columnNames: ['account_id'],
//         }),
//       );
//       await queryRunner.createIndex(
//         'soldier',
//         new TableIndex({
//           name: 'IX_soldier_2',
//           columnNames: ['user_id', 'account_id'],
//         }),
//       );
//
//       await queryRunner.createForeignKey(
//         'soldier',
//         new TableForeignKey({
//           columnNames: ['user_id'],
//           referencedTableName: 'user',
//           referencedColumnNames: ['id'],
//           onDelete: 'CASCADE',
//         }),
//       );
//
//       await queryRunner.createForeignKey(
//         'soldier',
//         new TableForeignKey({
//           columnNames: ['account_id'],
//           referencedTableName: 'account',
//           referencedColumnNames: ['id'],
//           onDelete: 'CASCADE',
//         }),
//       );
//     } else {
//       console.log('병종 테이블이 있다.');
//     }
//   }
//
//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropTable('code');
//     await queryRunner.dropTable('soldier');
//     await queryRunner.dropTable('account');
//     await queryRunner.dropTable('user');
//   }
// }
