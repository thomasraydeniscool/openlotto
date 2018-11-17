import { Router, RequestType } from 'express-mate';
import { getActiveDraw } from './draw.controller';
import { IEndpoint } from '../../../config/app';

const GET = Router.createRoutes(RequestType.GET, [
  {
    path: '/active',
    steps: [
      getActiveDraw
    ]
  }
]);

const router = new Router(GET);

const endpoint: IEndpoint = { path: '/draws', router: router.routes };

export default endpoint;
