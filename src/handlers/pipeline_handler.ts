import { Logger } from "../logger";
import { Sender } from "../sender";
import { Handler } from "./core";

export interface PipelineData {
  user_name: string,
  user: {
    name: string,
    username: string,
  },
  project: {
    name: string,
    path_with_namespace: string,
  },
  object_attributes: {
    name: string,
    description: string,
    ref: string
    status: string,
    created_at: string,
    finished_at: string,
  },
  commit: {
    message: string,
    author: {
      name: string
    }
  }
}

export class PipelineHandler extends Handler {

  constructor(sender: Sender, logger: Logger, enabled: boolean) {
    super(sender, logger, enabled);
  }

  handle(object: PipelineData): number {
    const userName = object.user_name;
    const projectPathWithNamespace = object.project.path_with_namespace;
    const projectName = object.project.name;
    const ref = object.object_attributes.ref;
    const status = object.object_attributes.status;
    const msg = `Pipeline status is ${status}  on project ${projectName} :: ${ref}`;
    this.logger.log(msg);
    const messageContent = {
      event_type: "pipeline",
      user_name: userName,
      project_name: projectName,
      project_path: projectPathWithNamespace,
      ref: ref,
      status: status
    };
    this.sendMessage(projectPathWithNamespace, messageContent);
    return 200;
  }
}