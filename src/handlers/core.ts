import { Logger } from "../logger";
import { MessageContent, MessageData, Sender } from "../sender";

export abstract class Handler {

  protected readonly logger;
  protected readonly sender;
  public readonly enabled;

  abstract handle(object: MessageData): number;

  constructor(sender: Sender, logger: Logger, enabled: boolean) {
    this.logger = logger;
    this.sender = sender;
    this.enabled = enabled;
  }

  sendMessage(projectPathWithNamespace: string, message: MessageContent): void {
    this.sender.sendMessage(projectPathWithNamespace, message).subscribe({
      next: (id) => this.logger.log(`SND OK: ${!id ? "id?" : id.toString()}`),
      error: (err) => this.logger.log(`SND ER: ${err.toString()}`)
    });
  }

}



