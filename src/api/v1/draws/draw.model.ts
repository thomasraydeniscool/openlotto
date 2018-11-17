import { Schema, model, SchemaTypes } from 'mongoose';
import { IDraw, IDrawModel } from './draw.types';
import { IBet } from '../bets/bet.types';

const DrawSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
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
  },
  {
    timestamps: true,
    toJSON: {
      getters: true
    },
    toObject: {
      getters: true
    }
  }
);

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

DrawSchema.statics.number = function(this: IDrawModel) {
  return this.find().sort('-createdAt').exec().then((draws) => {
    // make sure to at least return the number 1
    return Math.max(1, draws.length + 1);
  });
}

export const Draw = model<IDraw, IDrawModel>('Draw', DrawSchema);

export default Draw;
