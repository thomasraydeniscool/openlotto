import { Router, RequestType } from 'express-mate';
import { IEndpoint } from '../../../config/app';
import { register, login } from './user.controller';

const GET = Router.createRoutes(RequestType.GET, [
  {
    path: '/',
    steps: []
  }
]);

const PATCH = Router.createRoutes(RequestType.PATCH, [
  {
    path: '/',
    steps: []
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

const router = new Router(GET, PATCH, POST);

const endpoint: IEndpoint = { path: '/user', router: router.routes };

export default endpoint;
