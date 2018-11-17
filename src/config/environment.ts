import dotenv from 'dotenv';
import envalid, { bool, num } from 'envalid';

dotenv.config();

export const env = envalid.cleanEnv(process.env, {
  DEVELOPMENT: bool({ default: true }),
  PORT: num({ default: 3000 }),
});

export default env;
