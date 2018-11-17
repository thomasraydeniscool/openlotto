import User from './user.model';
import { TOKEN_GIFT } from './user.const';

export const giftUsersTokens = async () => {
  const users = await User.find();
  await users.forEach(async user => {
    if (user.tokens < TOKEN_GIFT) {
      user.tokens += TOKEN_GIFT;
      await user.save();
    }
  }, Promise.resolve);
};
