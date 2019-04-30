import { Router, RequestType } from 'express-mate';
import { IEndpoint } from '../../../config/app';
import { register, login, account } from './user.controller';
import { auth } from '../../../util/auth';

const GET = Router.createRoutes(RequestType.GET, [
  {
    path: '/account',
    steps: [auth, account]
  }
]);

const POST = Router.createRoutes(RequestType.POST, [
  {
    path: '/login',
    steps: [login]
  },
  {
    path: '/register',
    steps: [register]
  },
]);

const router = new Router(GET, POST);

const endpoint: IEndpoint = { path: '/users', router: router.routes };

export default endpoint;
