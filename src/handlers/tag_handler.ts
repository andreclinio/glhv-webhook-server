import { Logger } from "../logger";
import { Sender } from "../sender";
import { Handler } from "./core";

export interface TagData {
  user_name: string,
  project: {
    id: number,
    name: string,
    description: string,
    path_with_namespace: string
  },
  total_commits_count: number,
  ref: string
}

export class TagHandler extends Handler {

  constructor(sender: Sender, logger: Logger) {
    super(sender, logger);
  }

  handle(object: TagData): number {
    const userName = object.user_name;
    const projectPathWithNamespace = object.project.path_with_namespace;
    const projectName = object.project.name;
    const numCommits = object.total_commits_count;
    const ref = object.ref;
    const msg = `User ${userName} has pushed ${numCommits} commit(s) on project ${projectName} :: ${ref}`;
    this.logger.log(msg);
    const messageContent = {
      user_name: userName,
      project_name: projectName,
      project_path: projectPathWithNamespace,
      num_commits: numCommits.toFixed(0),
      ref: ref
    }
    this.sendMessage(projectPathWithNamespace, messageContent);
    return 200;
  }
}