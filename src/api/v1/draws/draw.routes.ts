import { Router, RequestType } from 'express-mate';
import { getDraws } from './draw.controller';
import { IEndpoint } from '../../../config/app';

const GET = Router.createRoutes(RequestType.GET, [
  {
    path: '/',
    steps: [
      getDraws
    ]
  }
]);

const router = new Router(GET);

const endpoint: IEndpoint = { path: '/draws', router: router.routes };

export default endpoint;
