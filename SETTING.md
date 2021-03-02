## package 추가
```shell
npm install --save @nestjs/config
npm install --save @nestjs/jwt passport-jwt
npm install --save @nestjs/typeorm typeorm mysql2
npm install --save typeorm-naming-strategies
npm install --save mongodb mongoose @nestjs/mongoose # mongoose 가 5.11 이후 type 이 정의되어 @types/mongoose 는 필요없음
```

## ignore 파일 추가
1. .eslintignore  
```text
# /node_modules/* in the project root is ignored by default
# build artefacts
dist/*
#coverage/*
# data definition files
#**/*.d.ts
# 3rd party libs
#/src/public/
# custom definition files
#/src/types/

node_modules/*
```
2. .prettierignore
```text
node_modules/
dist
public
package-lock.json
```

## 설정 파일 추가 및 수정
1. ormconfig.js
```javascript
const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;
module.exports = {
   type: 'mariadb',
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_DATA,
   synchronize: false,
   logging: true,
   entities: ['dist/entities/**.entity{.ts,.js}'],
   cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
   },
   namingStrategy: new SnakeNamingStrategy(),
   dropSchema: false,
};
```
2. .prettierrc
```json
{
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 160,
  "trailingComma": "all",
  "useTabs": false
}
```
3. src/config.ts
```typescript
const SECRET = 'xxxxxx';
export { SECRET };
```
4. .gitignore 추가
```text
.env
package-lock.json
```
5. .env 내용 입력하기  [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)
```shell
cp .env.example .env
```
```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_USER=exam_user
DB_PASS=exam_pass
DB_DATA=test
DB_SYNC=false
DB_LOGGIN=true

MONGODB_USER=exam_user
MONGODB_PASS=exam_pass
MONGODB_HOST=localhost
MONGODB_PORT=27000
```

## DB 설정 [NestJS Database](https://docs.nestjs.com/techniques/database)
1. TypeORM 설정  
   `ormconfig.js` 에 작성
1. AppModule class  
   @Module 의 imports 에 `import { TypeOrmModule } from '@nestjs/typeorm';`, `TypeOrmModule.forRoot()` 추가
1. Basic Entity
```typescript
import { Column, CreateDateColumn, UpdateDateColumn, BaseEntity, Index } from 'typeorm'

export default abstract class BasicEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 8, nullable: true, comment: '상태' })
  status!: string
  @Column({ type: 'int', nullable: true, comment: '등록 계정' })
  createdId?: number
  @Column({ type: 'int', nullable: true, comment: '수정 계정' })
  updatedId?: number

  @CreateDateColumn({ type: 'datetime', nullable: true, comment: '등록 일시' })
  @Index()
  createdAt?: Date
  @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '수정 일시' })
  updatedAt?: Date
}

export interface IBasic {
  status?: string
  createdId?: number
  updatedId?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface IBasicSearch {
  current: number
  pageSize: number
  status: string
}
```

## MongoDB 설정
1. mongoose scheme 작성
