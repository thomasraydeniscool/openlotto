import { Router, RequestType } from 'express-mate';
import { IEndpoint } from '../../../config/app';
import { createBet } from './bet.controller';
import { auth } from '../../../util/auth';

const POST = Router.createRoutes(RequestType.POST, [
  {
    path: '/',
    steps: [auth, createBet]
  }
]);

const router = new Router(POST);

const endpoint: IEndpoint = { path: '/bets', router: router.routes };

export default endpoint;
