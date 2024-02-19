import { join } from 'path';

const config = {
  development: {
    publicPath: join(process.cwd(), 'public'),
  },
  production: {
    publicPath: join(process.cwd(), '..', 'public'),
  },
};

export default config;
