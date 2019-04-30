import { Document, Model } from 'mongoose';

import { IBet } from '../bets/bet.types';

export interface IDraw extends Document {
  number: number;
  active: boolean;
  start: Date;
  end: Date;
  bets?: IBet[];
  amount?: number;
  winner?: IBet;
}

export interface IDrawModel extends Model<IDraw> {
  amount: (drawId: string) => Promise<number>;
  number: () => Promise<number>;
}