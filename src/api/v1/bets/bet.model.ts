import { Schema, model, SchemaTypes } from 'mongoose';
import { IBet, IBetModel } from './bet.types';
import { CHANCE_BONUS, CHANCE_BASE } from './bet.const';

const BetSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    draw: {
      type: SchemaTypes.ObjectId,
      ref: 'Draw',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    chance: {
      type: Number,
      required: true
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

BetSchema.statics.winner = function(this: IBetModel, drawId: string) {
  return this.find({ draw: drawId })
    .exec()
    .then(bets => {
      const weighted: IBet[] = [];
      bets.forEach(bet => {
        const amount = Math.abs(bet.chance * 100);
        Array.from(Array(amount).keys()).forEach(() => {
          weighted.push(bet);
        });
      });
      const min = 0;
      const max = weighted.length;
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      return weighted[rand];
    });
};

BetSchema.statics.chance = function(this: IBetModel, drawId: string) {
  return this.find({ draw: drawId })
    .exec()
    .then(bets => {
      // returns zero if bonus is below zero
      const bonus = Math.max(0, CHANCE_BONUS - bets.length / 100);
      const chance = CHANCE_BASE + bonus;
      return chance;
    });
};

export const Bet = model<IBet, IBetModel>('Bet', BetSchema);

export default Bet;
