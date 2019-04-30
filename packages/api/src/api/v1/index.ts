import e, { Router } from 'express';
import { IEndpoint } from '../../config/app';

import draws from './draws/draw.routes';
import users from './users/user.routes';
import bets from './bets/bet.routes';

export const v1: any = {
  draws,
  users,
  bets
};

const routes: Router = e.Router();

Object.keys(v1).forEach((key) => {
  routes.use(v1[key].path, v1[key].router);
});

const endpoint: IEndpoint = { path: '/v1', router: routes };

export default endpoint;
