import { MiddlewaresConsumer } from '@nestjs/common/interfaces';
import { AuthMiddleware } from './users/auth.middleware';
import { NestModule } from '@nestjs/common/interfaces/modules';
import { UsersModule } from './users/users.module';
import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from "./app.controller";

@Module({
  modules: [UsersModule],
  controllers: [AppController]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path: '/users',  method: RequestMethod.ALL}
    )
  }
}
