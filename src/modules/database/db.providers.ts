import { DbConnectionToken } from '../../constants';

import * as mongoose from 'mongoose';

const uri: string = `mongodb://admin:t4n4k4@ds044667.mlab.com:44667/tanaka`

export const databaseProviders = [
  {
    provide: DbConnectionToken,
    useFactory: async () => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.createConnection(uri);
    },
  },
];