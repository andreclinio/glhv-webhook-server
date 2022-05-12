import yargs, { Arguments } from "yargs";
import { Logger } from "./logger";

export class Config {

  public readonly logger: Logger;
  private readonly args: Arguments;

  public static readonly PORT_TAG = "port";
  public static readonly TOKEN_TAG = "token";
  public static readonly APP_NAME_TAG = "application-name";

  static addPortOption(argv: yargs.Argv): yargs.Argv {
    return argv.option(Config.PORT_TAG, {
      type: "number",
      alias: "p",
      default: 44000,
      demandOption: true,
      description: "Set the server port",
    });
  }

  static addTokenOption(argv: yargs.Argv): yargs.Argv {
    return argv.option(Config.TOKEN_TAG, {
      type: "string",
      alias: "t",
      default: "this-is-not-a-token",
      demandOption: true,
      description: "Set the FCM app token",
    });
  }

  static addApplicationNameOption(argv: yargs.Argv): yargs.Argv {
    return argv.option(Config.APP_NAME_TAG, {
      type: "string",
      alias: "a",
      default: "this-is-not-a-application-name",
      demandOption: true,
      description: "Set the FCM application name (id)",
    });
  }

  constructor(args: Arguments) {
    this.logger = new Logger(args.verbose as boolean);
    this.args = args;
  }
  
  public getPort(): number {
    const port = this.args[Config.PORT_TAG] as number;
    this.logger.log(`port: ${port}`);
    return port;
  }

  public getToken(): string {
    const token = this.args[Config.TOKEN_TAG] as string;
    const length = token.length;
    const prefixCard = 7
    const sufixCard = 10
    this.logger.log(`token: ${token.substring(0, prefixCard) + '.....' + token.substring(length-sufixCard-1, length-1)}`);
    return token;
  }

  public getApplicationName(): string {
    const appName = this.args[Config.APP_NAME_TAG] as string;
    this.logger.log(`application name: ${appName}`);
    return appName;
  }

}
