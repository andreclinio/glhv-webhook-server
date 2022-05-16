import { Logger } from "../logger";
import { Sender } from "../sender";
import { Handler } from "./core";

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
    path_with_namespace: string
  }
  object_attributes: {
    action: "open" | "close" | "update" | "reopen",
    title: string
  }
}

export class IssueHandler extends Handler {

  constructor(sender: Sender, logger: Logger, enabled: boolean) {
    super(sender, logger, enabled);
  }

  handle(object: IssueData): number {
    const userLogin = object.user.username;
    const projectName = object.project.name;
    const projectPathWithNamespace = object.project.path_with_namespace;
    const issueTitle = object.object_attributes.title;
    const action = object.object_attributes.action;
    const msg = `User ${userLogin} has performed action ${action} for issue ${issueTitle} on project ${projectName}`;
    this.logger.log(msg);
    const messageContent = {
      event_type: "issue",
      user_login: userLogin,
      project_name: projectName,
      project_path: projectPathWithNamespace,
      issue_title: issueTitle,
      action: action
    }
    this.sendMessage(projectPathWithNamespace, messageContent);
    return 200;
  }
}