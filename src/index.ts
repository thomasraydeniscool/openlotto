import winston from 'winston';
import mongoose from 'mongoose';
import http from 'http';
import socket from 'socket.io';

import { env } from './config/environment';
import App from './config/app';

import v1 from './api/v1';
import { checkActiveDraw } from './api/v1/draws/draw.func';
import scheduleCronJobs from './config/cron';

/**
 * Connect to the mongodb database using
 * the mongoose library.
 */
mongoose.connect(
  env.DATABASE,
  { useNewUrlParser: true }
);
mongoose.connection.on('error', err => {
  throw err;
});

/**
 * Setup logger
 */
const loggers: any[] = [
  new winston.transports.File({ filename: 'error.logs', level: 'error' })
];

if (env.DEVELOPMENT) {
  loggers.push(
    new winston.transports.Console({ format: winston.format.simple() })
  );
}

winston.configure({
  transports: loggers
});

const app = new App([v1]);

app.setup();

const server = new http.Server(app.instance);

const io = socket(server);

checkActiveDraw().then(() => {
  /**
   * Make sure there is an active lottery draw
   * before the server is started
   */
  scheduleCronJobs();
  // Start API
  server.listen(env.PORT, () => {
    winston.info('Listening on *:3000');
  });
});

