import { Document, Model } from 'mongoose';

import { IBet } from '../bets/bet.types';
import { IUser } from '../users/user.types';

export interface IDraw extends Document {
  active: boolean;
  start: Date;
  end: Date;
  bets?: IBet[];
  amount?: number;
  winner?: IBet;
}

export interface IDrawModel extends Model<IDraw> {
  amount: (drawId: string) => Promise<number>;
}