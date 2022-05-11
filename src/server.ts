import express, { Express, Request, Response } from 'express';
import { Config } from './config';
import { Handler, IssueHandler, PushHandler } from './handler';

enum Kind {
  PUSH = "push",
  TAG = "tag",
  ISSUE = "issue",
}
export class Server {

  private readonly port;
  private readonly logger;
  private readonly pushHandler;
  private readonly issueHandler;

  constructor(config: Config) {
    this.port = config.getPort();
    this.logger = config.logger;
    this.pushHandler = new PushHandler(this.logger);
    this.issueHandler = new IssueHandler(this.logger);
  }

  run(): void {
    this.logger.log(`Server is starting...`);
    const app: Express = express();
    app.use(express.json());
    app.post('/', (req: Request, res: Response) => {
      const body = req.body;
      const bodyAsString = JSON.stringify(body);
      const kindRaw = body.object_kind
      const kind = kindRaw as Kind;
      const handler = this.getHandler(kind);
      if (handler) {
        handler.handle(body);
        res.status(200);
      }
      else {
        res.status(403);
      }
    });

    app.listen(this.port, () => {
      this.logger.log(`Server is running at localhost:${this.port}`);
    });
  }

  private getHandler(kind: Kind): Handler | undefined {
    switch (kind) {
      case Kind.PUSH:
        return this.pushHandler;
      case Kind.ISSUE:
        return this.issueHandler;
      case Kind.TAG:
      default:
        this.logger.log(`Unrecognized kind ${kind}`);
        return undefined;
    }
  }
}
