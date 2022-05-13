import yargs, { Arguments } from "yargs";
import { Logger } from "./logger";

export class Config {

  public readonly logger: Logger;
  private readonly args: Arguments;

  public static readonly PORT_TAG = "port";
  public static readonly DEVICE_TOKEN_TAG = "device-token";
  public static readonly GITLAB_SERVER_URL_TAG = "gitlab-server-url";
  public static readonly SECRET_FILE_PATH_TAG = "secret-file-path";

  static addPortOption(argv: yargs.Argv): yargs.Argv {
    return argv.option(Config.PORT_TAG, {
      type: "number",
      alias: "p",
      demandOption: true,
      description: "Set the server port",
    });
  }

  static addSecretFilePathOption(argv: yargs.Argv): yargs.Argv {
    return argv.option(Config.SECRET_FILE_PATH_TAG, {
      type: "string",
      alias: "s",
      demandOption: true,
      description: "Set the secret file path",
    });
  }

  static addDeviceTokenOption(argv: yargs.Argv): yargs.Argv {
    return argv.option(Config.DEVICE_TOKEN_TAG, {
      type: "string",
      alias: "d",
      requiresArg: true,
      demandOption: true,
      description: "Set the FCM device token",
    });
  }

  static addGitlabServerUrlOption(argv: yargs.Argv): yargs.Argv {
    return argv.option(Config.GITLAB_SERVER_URL_TAG, {
      type: "string",
      alias: "g",
      demandOption: true,
      requiresArg: true,
      description: "Set the Gitlab server URL",
    });
  }

  constructor(args: Arguments) {
    this.logger = new Logger(args.verbose as boolean);
    this.args = args;
  }
  
  public getPort(): number {
    const port = this.args[Config.PORT_TAG] as number;
    this.logger.log(`Server port: ${port}`);
    return port;
  }

  public getDeviceToken(): string {
    const deviceToken = this.args[Config.DEVICE_TOKEN_TAG] as string;
    const length = deviceToken.length;
    const prefixCard = 5
    const sufixCard = 5
    this.logger.log(`Device token: ${deviceToken.substring(0, prefixCard) + '.....' + deviceToken.substring(length-sufixCard-1, length-1)}`);
    return deviceToken;
  }

  public getSecretFilePath(): string {
    const secretFilePath = this.args[Config.SECRET_FILE_PATH_TAG] as string;
    const length = secretFilePath.length;
    const prefixCard = 7
    const sufixCard = 5
    this.logger.log(`Secret file: ${secretFilePath.substring(0, prefixCard) + '.....' + secretFilePath.substring(length-sufixCard-1, length-1)}`);
    return secretFilePath;
  }

  public getGitlabServerUrl(): string {
    const gitlabServerUrl = this.args[Config.GITLAB_SERVER_URL_TAG] as string;
    this.logger.log(`Gitlab server URL: ${gitlabServerUrl}`);
    return gitlabServerUrl;
  }

}
