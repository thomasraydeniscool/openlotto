import { Schema, model, SchemaTypes } from 'mongoose';
import { IDraw, IDrawModel } from './draw.types';
import { IBet } from '../bets/bet.types';

const DrawSchema = new Schema({
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  amount: {
    type: Number
  },
  winner: {
    type: SchemaTypes.ObjectId,
    ref: 'Bet'
  }
});

DrawSchema.virtual('bets', {
  ref: 'Bet',
  localField: '_id',
  foreignField: 'draw'
});

DrawSchema.statics.amount = function(this: IDrawModel, drawId: string) {
  return this.findById(drawId)
    .populate('bets')
    .exec()
    .then(draw => {
      let amount = 0;
      if (draw && draw.bets) {
        draw.bets.forEach((bet: IBet) => {
          amount += bet.amount;
        });
      }
      return amount;
    });
};

export const Draw = model<IDraw, IDrawModel>('Draw', DrawSchema);

export default Draw;
