import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, IUserModel } from './user.types';

const RESERVED_WORDS: string[] = ['account'];

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
}, {
  toJSON: {
    getters: true
  },
  toObject: {
    getters: true
  }
});

UserSchema.pre('save', async function (this: IUser) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

UserSchema.path('username').validate(async function (this: IUserModel, username: string) {
  const match = await this.find({ username });
  if (match.length) {
    return false;
  }
  return true;
}, 'Username is already taken.');

UserSchema.path('username').validate(async function(this: IUserModel, username: string) {
  if (RESERVED_WORDS.includes(username)) {
    return false;
  }
  return true;
}, 'Username is a reserved word.');

UserSchema.statics.checkPassword = function (this: IUserModel, userId: string, password: string) {
  return this.findById(userId).select('+password').exec((user: IUser) => bcrypt.compare(user.password, password));
}

export const User = model<IUser, IUserModel>('User', UserSchema);

export default User;