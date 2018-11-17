import { Router, RequestType } from 'express-mate';
import { IEndpoint } from '../../../config/app';
import { register, login } from './user.controller';

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

const router = new Router(POST);

const endpoint: IEndpoint = { path: '/users', router: router.routes };

export default endpoint;