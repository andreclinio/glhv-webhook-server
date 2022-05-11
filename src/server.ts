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
    app.get('/', (req: Request, res: Response) => {
      res.send(`${req.body}`);
    });

    app.listen(this.port, () => {
      this.logger.log(`Server is running at localhost:${this.port}`);
    });

  }
}