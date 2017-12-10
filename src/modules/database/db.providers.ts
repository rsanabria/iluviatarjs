import { DbConnectionToken } from '../../constants';

import * as mongoose from 'mongoose';

const uri: string = `mongodb://<user>:<passwd>@<server>:<port>/<db>`

export const databaseProviders = [
  {
    provide: DbConnectionToken,
    useFactory: async () => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.createConnection(uri);
    },
  },
];
