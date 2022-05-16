import { from, Observable } from "rxjs";
import { Logger } from "./logger";
import { accessSync, constants, existsSync } from "fs";
import { TagData } from "./handlers/tag_handler";
import { PushData } from "./handlers/push_handler";
import { IssueData } from "./handlers/issue_handler";
import { PipelineData } from "./handlers/pipeline_handler";


type MessageResponse = {
  name: string;
};

export type MessageData = TagData | PushData | IssueData | PipelineData;

type MessageRequest = {
  data: MessageData,
  token?: string,
  topic?: string
}

export class Sender {

  private readonly gitlabServerUrl: string;
  private readonly logger: Logger;
  private readonly admin: any;

  public constructor(logger: Logger, gitlabServerUrl: string, secretFilePath: string) {
    this.logger = logger;
    this.gitlabServerUrl = gitlabServerUrl;
    this.admin = require("firebase-admin");
    Sender.checkSecretFile(logger, secretFilePath);
    var serviceAccount = require(secretFilePath);
    this.admin.initializeApp({
      credential: this.admin.credential.cert(serviceAccount)
    });
  }

  public testMessage(deviceToken: string): Observable<string | undefined> {
    this.logger.log(`Test message for device: ${deviceToken.substring(0, 10)}.....`);
    const messageRequest = {
      notification: {
        title: 'GitLab High Views',
        body: `test message from ${this.gitlabServerUrl}`
      },
      token: deviceToken
    };
    const prm = this.admin.messaging().send(messageRequest) as Promise<string | undefined>;
    return from(prm);
  }

  public sendMessage(projectPathWithnameSpace: string, messageData: MessageData): Observable<string | undefined> {
    const topic = this.gitlabServerUrl + "%%%" + projectPathWithnameSpace.replace("/", "%%%");
    this.logger.log(`Topic is: ${topic}`);
    const messageRequest : MessageRequest = {
      data: messageData,
      topic: topic
    };
    const prm = this.admin.messaging().send(messageRequest) as Promise<string | undefined>;
    return from(prm);
  }

  private static checkSecretFile(logger: Logger, secretFilePath: string) {
    if (!existsSync(secretFilePath)) {
      logger.exit(`Cannot find secret file!`);
    }
    const foundMsg = Logger.toGreen("Secret file found!");
    logger.log(foundMsg);

    if (!Sender.canRead(secretFilePath)) {
      logger.exit(`Cannot read secret file!`);
    }
    const readMsg = Logger.toGreen("Secret file is readable!");
    logger.log(readMsg);

  }
  
  private static canRead(path: string) : boolean {
    try {
      accessSync(path, constants.R_OK);
      return true;
    }
    catch (err) {
      return false;
    }
  }
}

