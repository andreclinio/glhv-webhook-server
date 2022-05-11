import yargs, { Arguments } from "yargs";
import { Logger } from "./logger";

export class Config {

  private _logger: Logger;
  private _args: Arguments;

  public static readonly PORT_TAG = "port";

  static addPortOption(argv: yargs.Argv): yargs.Argv {
    return argv.option(Config.PORT_TAG, {
      type: "number",
      alias: "p",
      default: 44000,
      demandOption: true,
      description: "Set the server port",
    });
  }

  public getPort(): number {
    const port = this._args[Config.PORT_TAG] as number;
    this._logger.log(`port: ${port}`);
    return port;
  }

  get logger(): Logger {
    return this._logger;
  }

  constructor(args: Arguments) {
    this._logger = new Logger(args.verbose as boolean);
    this._args = args;
  }
}
