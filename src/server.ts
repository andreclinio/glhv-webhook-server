import express, { Express, Request, Response } from 'express';
import { Config } from './config';
import { Logger } from './logger';

export class Server {

  private readonly port;
  private readonly logger;

  constructor(config: Config) {
    this.port = config.getPort();
    this.logger = config.logger;
  }

  run(): void {
    this.logger.log(`Server is starting...`);
    const app: Express = express();
    app.use(express.json());
    app.post('/', (req: Request, res: Response) => {
      const body = req.body;
      const bodyAsString = JSON.stringify(body);
      const kind = body.object_kind;
      this.logger.log(`WebHook activated body :${kind}`);
      res.status(200);
    });

    app.listen(this.port, () => {
      this.logger.log(`Server is running at localhost:${this.port}`);
    });
  }
}
