import { ApiSuccess, ApiError } from 'express-mate';
import { Response, Request } from 'express';
import Bet from './bet.model';

export const createBet = async (req: Request, res: Response) => {
  const { body, user } = req as any;
  const bet = new Bet({ ...body, user });
  bet.amount = 100;
  bet.chance = await Bet.chance(bet.draw._id);

  /**
   * Validate
   */
  if (user.tokens < bet.amount) {
    throw new ApiError(res, 'You do not have enough tokens.');
  }

  /**
   * Save new Bet
   */
  await bet.save();

  /**
   * Update users tokens
   */
  user.tokens -= bet.amount;
  await user.save();

  return new ApiSuccess(res, bet);
};
