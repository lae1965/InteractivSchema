import { join } from 'path';

const config = {
  development: {
    publicPath: join(process.cwd(), 'public'),
    databaseStorage: join(process.cwd(), 'database.sqlite3'),
  },
  production: {
    publicPath: join(process.cwd(), '..', 'public'),
    databaseStorage: join(process.cwd(), '..', 'database.sqlite3'),
  },
};

export default config;
