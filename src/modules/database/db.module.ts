import { Module } from "@nestjs/common";
import { databaseProviders } from './db.providers';

@Module({
  modules: [],
  controllers: [],
  components: [...databaseProviders],
  exports: [...databaseProviders]
})
export class DbModule {}
