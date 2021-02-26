import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SoldierModule } from './soldier/soldier.module';
import { CodeModule } from './code/code.module';
import { Connection } from 'typeorm';
import { AuthMiddleware } from './auth/auth.middleware';
import { AccountModule } from './account/account.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot(), UserModule, SoldierModule, CodeModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: 'api/user/signIn',
          method: RequestMethod.ALL,
        },
        {
          path: 'api/user/tokenRefresh',
          method: RequestMethod.ALL,
        },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
