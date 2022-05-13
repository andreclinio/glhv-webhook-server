import { Observable } from "rxjs";
import { Logger } from "../logger";
import { Sender } from "../sender";
import { IssueData } from "./issue_handler";
import { PushData } from "./push_handler";

export abstract class Handler {

  protected readonly logger;
  protected readonly sender;

  abstract handle(object: PushData | IssueData): number;

  constructor(sender: Sender, logger: Logger) {
    this.logger = logger;
    this.sender = sender;
  }

  sendMessage(projectPathWithNamespace: string, message: string) : void {
    this.sender.sendMessage(projectPathWithNamespace, message).subscribe( 
      (id) => this.logger.log(`SND OK: ${!id ? "id?" : id.toString()}`), 
      (err) => this.logger.log(`SND ER: ${err.toString()}`)
    );
  }

}



