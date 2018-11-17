import { Request, Response } from 'express';
import User from './user.model';
import { ApiSuccess, ApiError } from 'express-mate';
import { packageAuth } from '../../../util/auth';

export const register = async (req: Request, res: Response) => {
  const { body } = req; 
  const user = new User(body);
  await user.save();
  return new ApiSuccess(res, packageAuth(user));
};

export const login = async (req: Request, res: Response) => {
  const { body } = req;
  const user = await User.findOne({ username: body.username });
  if (!user) {
    throw new ApiError(res, 'No account found with the username.');
  }
  const check = await User.checkPassword(user.id, body.password);
  if (check === true) {
    return new ApiSuccess(res, packageAuth(user));
  } else {
    return new ApiError(res, 'Password incorrect.');
  }
}