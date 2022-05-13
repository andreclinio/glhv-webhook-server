import axios, { AxiosInstance, AxiosResponse } from "axios";
import { catchError, from, map, Observable, of } from "rxjs";
import { Logger } from "./logger";

type MessageResponse = {
  name: string;
};

type MessageRequest = {
  notification: {
    title: string,
    body: string
  },
  token?: string,
  topic?: string
}

export class Sender {

  private readonly gitlabServerUrl: string;
  private readonly logger: Logger;
  private readonly admin: any;

  public constructor(logger: Logger, gitlabServerUrl: string) {
    this.logger = logger;
    this.gitlabServerUrl = gitlabServerUrl;
    this.admin = require("firebase-admin");
    var serviceAccount = require("../security/gitlab-high-views-firebase-adminsdk.json");
    this.admin.initializeApp({
      credential: this.admin.credential.cert(serviceAccount)
    });

  }

  public testMessage(deviceToken: string): Observable<string | undefined> {
    this.logger.log(`Test message for device: ${deviceToken.substring(0, 10)}.....`);
    const message = {
      notification: {
        title: 'GitLab High Views',
        body: `test message from ${this.gitlabServerUrl}`
      },
      token: deviceToken
    };
    return this.send(message);
  }

  public sendMessage(projectPathWithnameSpace: string, text: string): Observable<string | undefined> {
    const topic = this.gitlabServerUrl + "%%%" + projectPathWithnameSpace.replace("/", "%%%");
    const message = {
      notification: {
        title: 'GitLab High Views',
        body: text
      },
      topic: topic
    };
    return this.send(message);
  }

  private send(request: MessageRequest): Observable<string | undefined> {
    const prm = this.admin.messaging().send(request) as Promise<string | undefined>;
    return from(prm);
  }
}