import { Logger } from "../logger";
import { MessageData, Sender } from "../sender";

export abstract class Handler {

  protected readonly logger;
  protected readonly sender;

  abstract handle(object: MessageData): number;

  constructor(sender: Sender, logger: Logger) {
    this.logger = logger;
    this.sender = sender;
  }

  sendMessage(projectPathWithNamespace: string, message: MessageData): void {
    this.sender.sendMessage(projectPathWithNamespace, message).subscribe({
      next: (id) => this.logger.log(`SND OK: ${!id ? "id?" : id.toString()}`),
      error: (err) => this.logger.log(`SND ER: ${err.toString()}`)
    });
  }

}



