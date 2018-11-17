import dotenv from 'dotenv';
import envalid, { bool, num, str } from 'envalid';

dotenv.config();

export const env = envalid.cleanEnv(process.env, {
  DEVELOPMENT: bool({ default: true }),
  PORT: num({ default: 3000 }),
  DATABASE: str({ default: 'mongodb+srv://api:CNTpC7YplsM3Dspk@email-gatherer-sandbox-xavet.gcp.mongodb.net/test?retryWrites=true' }),
  TOKEN_SECRET: str({ default: 'openlotto-dev' }),
  TOKEN_EXPIRATION: num({ default: 86400000 })
});

export default env;
