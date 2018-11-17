import { DateTime } from 'luxon';
import Draw from './draw.model';
import Bet from '../bets/bet.model';

export const checkActiveDraw = async () => {
  const check = await Draw.find({
    active: true,
    end: { $gt: DateTime.local().toJSDate() }
  });
  if (!check.length) {
    await Draw.create({
      number: await Draw.number(),
      start: DateTime.local().toJSDate(),
      end: DateTime.local()
        .plus({ hours: 1 })
        .toJSDate()
    });
  }
};

export const checkFinishedDraws = async () => {
  const check = await Draw.find({ active: true, end: { $lte: DateTime.local() } });
  await check.forEach(async (draw) => {
    draw.active = false;
    draw.amount = await Draw.amount(draw.id);
    draw.winner = await Bet.winner(draw.id);
    await rewardWinner(draw.id);
    await draw.save();
  }, Promise.resolve);
  await checkActiveDraw();
}

export const rewardWinner = async (drawId: string) => {
  const draw = await Draw.findById(drawId).populate({ path: 'winner', populate: { path: 'user' } });
  if (draw && draw.amount && draw.winner && draw.winner.user) {
    const winner = draw.winner.user;
    winner.tokens += draw.amount;
    await winner.save();
  }
}
