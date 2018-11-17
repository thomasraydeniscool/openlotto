import schedule from 'node-schedule';
import { checkFinishedDraws } from '../api/v1/draws/draw.func';
import { giftUsersTokens } from '../api/v1/users/user.func';
import winston = require('winston');

const scheduleCronJobs = () => {
  /**
   * Run every minute
   */
  schedule.scheduleJob('*/1 * * * *', () => {
    checkFinishedDraws().then().catch((err) => { winston.error(err.message); });
  });

  /**
   * Run at the end of each day
   */
  schedule.scheduleJob('0 23 * * *', () => {
    giftUsersTokens().then().catch((err) => { winston.error(err.message); });
  });
};

export default scheduleCronJobs;