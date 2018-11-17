import jwt from 'jsonwebtoken';
import { ApiUnauthorized } from 'express-mate';
import { Response, Request } from 'express';
import { NextFunction } from 'connect';

import env from '../config/environment';
import User from '../api/v1/users/user.model';
import { IUser } from '../api/v1/users/user.types';

/**
 * Generate an authentication token which can be sent to the client to
 * verify future requests.
 */
export const generateToken = (data: { id: string, username: string }) =>
  jwt.sign(data, env.TOKEN_SECRET, {
    expiresIn: env.TOKEN_EXPIRATION
  });

/**
 * Pack a user's data to send to client.
 */
export const packageAuth = (
  user: IUser,
  expiration = Date.now() + env.TOKEN_EXPIRATION
) => {
  return {
    id: user.id,
    username: user.username,
    tokens: user.tokens,
    token: generateToken({ id: user.id, username: user.username }),
    expiration
  };
};

/**
 * Decode a jwt token.
 */
export const decodeToken = (token: string): any => jwt.verify(token, env.TOKEN_SECRET);

/**
 * Extract the authorization token from a request and check if it matches
 * a specific user. If it does not, return an authentication failed response.
 * If if succeeds; set the request.user property with the authenticated user's
 * object.
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers || !req.headers.authorization) {
    throw new ApiUnauthorized(res);
  }
  let data;
  try {
    data = decodeToken(req.headers.authorization.slice(7));
  } catch (err) {
    throw new ApiUnauthorized(res);
  }
  const user = await User.findById(data._id);
  if (!user) {
    throw new ApiUnauthorized(res);
  }
  (req as any).user = user;
  next();
};
