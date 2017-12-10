import { UserController } from './user.controller';
import { DbModule } from '../database/db.module';
import { usersProviders } from './users.providers';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { Module } from "@nestjs/common";

@Module({
  modules: [DbModule],
  controllers: [UserController],
  components: [UserService, ...usersProviders],
  exports: []
})
export class UsersModule {}
