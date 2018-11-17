import { Schema, model } from 'mongoose';
import { IDraw, IDrawModel } from './draw.types';

const DrawSchema = new Schema({
  amount: {
    type: Number
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  }
});

export const Draw = model<IDraw, IDrawModel>('Draw', DrawSchema);

export default Draw;