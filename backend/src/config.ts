import { join } from 'path';

const development = {
  publicPath: join(process.cwd(), 'public'),
  databaseStorage: join(process.cwd(), 'database.sqlite3'),
};
const production = {
  publicPath: join(process.cwd(), 'public'),
  databaseStorage: join(process.cwd(), 'database.sqlite3'),
};

const config = () =>
  process.env.NODE_ENV === 'development' ? development : production;

export default config;
