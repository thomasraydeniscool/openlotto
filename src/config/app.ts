import e from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { ApiNotFound } from 'express-mate';

export interface IEndpoint {
  path: string;
  router: e.Router;
}

export class App {
  private app: e.Express;
  private endpoints: IEndpoint[];

  /**
   * App Class
   * @constructor
   * @param endpoints
   */
  constructor(endpoints: IEndpoint[]) {
    this.app = e();
    this.endpoints = endpoints;
  }

  /**
   * Get the App instance
   */
  get instance(): e.Express {
    return this.app;
  }

  /**
   * Setup the API
   * @param middleware callback function for adding custom middleware
   */
  public setup(middleware?: (app: e.Express) => void): void {
    this.setupExpress(middleware ? middleware : undefined);
  }

  /**
   * Start The API
   * @param port
   * @param callback
   */
  public start(port?: number, callback?: () => void): void {
    const p = port || 3000;
    this.app.listen(p, callback);
  }

  /**
   * Setup the Express server
   * @param middleware
   */
  private setupExpress(middleware?: (app: e.Express) => void): void {
    /**
     * Default Middleware
     */
    this.app.use(cors({ origin: '*' }));
    this.app.use(cookieParser());
    this.app.use(compress());
    this.app.use(methodOverride());
    this.app.use(helmet());
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.enable('trust proxy');

    /**
     * Custom Middleware
     */
    if (middleware && typeof middleware === 'function') {
      middleware(this.app);
    }

    /**
     * Setup API Endpoints
     */
    this.setupEndpoints();

    /**
     * Endpoint 404 Catcher
     */
    this.app.use((req, res) => {
      new ApiNotFound(res).end();
    });
  }

  /**
   * Attach all the endpoints to the app
   */
  private setupEndpoints(): void {
    for (const { path, router } of this.endpoints) {
      this.app.use(path, router);
    }
  }
}

export default App;
