import { Request, Response } from 'express';
import Draw from './draw.model';
import { ApiSuccess } from 'express-mate';

export const getActiveDraw = async (req: Request, res: Response) => {
  const draw = await Draw.findOne({ active: true }).populate('bets');
  return new ApiSuccess(res, draw);
};