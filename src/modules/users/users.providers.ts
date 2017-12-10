
import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';

import { DbConnectionToken, UserModelToken } from '../../constants';

export const usersProviders = [
  {
    provide: UserModelToken,
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [DbConnectionToken],
  }
];