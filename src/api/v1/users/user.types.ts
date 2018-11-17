import { Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  tokens: number;
}

export interface IUserModel extends Model<IUser> {
  checkPassword: (userId: string, password: string) => boolean;
}
