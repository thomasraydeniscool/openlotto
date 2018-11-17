import { Document, Model } from 'mongoose';
import { IUser } from '../users/user.types';
import { IDraw } from '../draws/draw.types';

export interface IBet extends Document {
  user: IUser;
  draw: IDraw;
  amount: number;
  chance: number;
}

export interface IBetModel extends Model<IBet> {
  winner: (drawId: string) => Promise<IBet>;
  chance: (drawId: string) => Promise<number>;
}
