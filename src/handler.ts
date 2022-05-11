import { Logger } from "./logger";

export abstract class Handler {
  
  protected readonly logger;
  
  abstract handle(object: PushData | IssueData): number;

  constructor(logger: Logger) {
    this.logger = logger;
  }
}

export interface IssueData {
  user: {
    name: string,
    username: string,
    email: string,
  }
  project: {
    id: number,
    name: string,
    description: string,
  }
}

export class IssueHandler extends Handler {

  constructor(logger: Logger) {
    super(logger);
  }

  handle(object: IssueData): number {
    const userName = object.user.name;
    const userLogin = object.user.username;
    const userEmail = object.user.email;
    const projectId = object.project.id;
    const projectName = object.project.name;
    return 200;
  }
}

export interface PushData {
  user_name: string,
  user_username: string,
  user_email: string,
  project: {
    id: number,
    name: string,
    description: string,
  }
}

export class PushHandler extends Handler {

  constructor(logger: Logger) {
    super(logger);
  }

  handle(object: PushData): number {
    const userName = object.user_name;
    const userLogin = object.user_username;
    const userEmail = object.user_email;
    const projectId = object.project.id;
    const projectName = object.project.name;
    return 200;
  }
}