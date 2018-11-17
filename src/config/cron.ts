import schedule from 'node-schedule';
import { checkFinishedDraws } from '../api/v1/draws/draw.func';
import { giftUsersTokens } from '../api/v1/users/user.func';

const scheduleCronJobs = () => {
  /**
   * Run every minute
   */
  schedule.scheduleJob('*/1 * * * *', () => {
    checkFinishedDraws().then();
  });

  /**
   * Run at the end of each day
   */
  schedule.scheduleJob('0 23 * * *', () => {
    giftUsersTokens().then();
  });
};

export default scheduleCronJobs;