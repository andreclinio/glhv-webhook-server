import express, { Express, Request, Response } from 'express';
import { Config } from './config';
import { Handler } from './handlers/core';
import { IssueHandler } from './handlers/issue_handler';
import { PipelineHandler } from './handlers/pipeline_handler';
import { PushHandler } from './handlers/push_handler';
import { TagHandler } from './handlers/tag_handler';
import { Sender } from './sender';

type Kind = "push" | "tag_push" | "issue" | "pipeline";

export class Server {

  private readonly port;
  private readonly logger;
  private readonly pushHandler;
  private readonly issueHandler;
  private readonly pipelineHandler;
  private readonly tagHandler;

  constructor(config: Config) {
    this.port = config.getPort();
    this.logger = config.logger;
    const gitlabServerUrl = config.getGitlabServerUrl();
    const secretFilePath = config.getSecretFilePath();
    const sender = new Sender(this.logger, gitlabServerUrl, secretFilePath);
    this.pushHandler = new PushHandler(sender, this.logger);
    this.issueHandler = new IssueHandler(sender, this.logger);
    this.pipelineHandler = new PipelineHandler(sender, this.logger);
    this.tagHandler = new TagHandler(sender, this.logger);
  }

  run(): void {
    this.logger.log(`Server is starting...`);
    const app: Express = express();
    app.use(express.json());
    app.post('/', (req: Request, res: Response) => {
      const body = req.body;
      const kindRaw = body.object_kind
      const kind = kindRaw as Kind;
      const handler = this.getHandler(kind);
      if (handler) {
        this.logger.log(`Recognized event kind ${kind}`);
        const status = handler.handle(body);
        res.status(status);
      }
      else {
        this.logger.log(`Unrecognized event kind [${kind}]`);
        res.status(403);
      }
    });

    app.listen(this.port, () => {
      this.logger.log(`Server is running at localhost:${this.port}`);
    });
  }

  private getHandler(kind: Kind): Handler | undefined {
    switch (kind) {
      case 'push':
        return this.pushHandler;
      case 'issue':
        return this.issueHandler;
      case 'tag_push':
        return this.tagHandler;
      case 'pipeline':
        return this.tagHandler;
      default:
        return undefined;
    }
  }
}
