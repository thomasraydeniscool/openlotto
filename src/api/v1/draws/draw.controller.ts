import { Request, Response } from 'express';
import Draw from './draw.model';
import { ApiSuccess } from 'express-mate';

export const getDraws = async (req: Request, res: Response) => {
  const draws = await Draw.find();
  return new ApiSuccess(res, draws);
};