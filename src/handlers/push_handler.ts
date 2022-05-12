import { Logger } from "../logger";
import { Sender } from "../sender";
import { Handler } from "./core";

export interface PushData {
  user_name: string,
  user_username: string,
  user_email: string,
  project: {
    id: number,
    name: string,
    description: string,
  },
  total_commits_count: number,
  ref: string
}

export class PushHandler extends Handler {

  constructor(sender: Sender, logger: Logger) {
    super(sender, logger);
  }

  handle(object: PushData): number {
    const userName = object.user_name;
    const userLogin = object.user_username;
    const userEmail = object.user_email;
    const projectId = object.project.id;
    const projectName = object.project.name;
    const numCommits = object.total_commits_count;
    const ref = object.ref;
    const msg = `User ${userLogin} has pushed ${numCommits} commit(s) on project ${projectName} :: ${ref}`;
    this.logger.log(msg);
    this.sendMessage(msg);
    return 200;
  }
}