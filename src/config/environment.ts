import dotenv from 'dotenv';
import envalid, { bool, num, str } from 'envalid';

dotenv.config();

export const env = envalid.cleanEnv(process.env, {
  DEVELOPMENT: bool({ default: true }),
  PORT: num({ default: 3000 }),
  DATABASE: str({ default: 'mongodb://localhost:27017/openlotto' }),
  TOKEN_SECRET: str({ default: 'openlotto-dev' }),
  TOKEN_EXPIRATION: num({ default: 86400000 })
});

export default env;
