import { ApiSuccess } from 'express-mate';
import { Response, Request } from 'express';
import Bet from './bet.model';

export const createBet = async (req: Request, res: Response) => {
  const { body, user } = req as any;
  const bet = new Bet({ ...body, user });
  bet.chance = await Bet.chance(bet.draw.id);
  await bet.save();
  return new ApiSuccess(res, bet);
};
