import schedule from 'node-schedule';
import { checkFinishedDraws } from '../api/v1/draws/draw.func';

const scheduleCronJobs = () => {
  /**
   * Run every minute
   */
  schedule.scheduleJob('*/1 * * * *', () => {
    checkFinishedDraws().then();
  });
};

export default scheduleCronJobs;