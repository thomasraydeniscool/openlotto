import { Document, Model } from 'mongoose';

export interface IDraw extends Document {
  amount?: number;
  start: Date;
  end: Date;
}

export interface IDrawModel extends Model<IDraw> {
}