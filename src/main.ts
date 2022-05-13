#!/usr/bin/env node

import { argv } from "process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { Config } from "./config";
import { Sender } from "./sender";
import { Server } from "./server";


yargs(hideBin(process.argv))
  .scriptName("glhv-webhook-server")
  .usage(
    `$0 <command> <arguments> `
  )
  
  .options({
    verbose: {
      default: false,
      demandOption: false,
      type: "boolean",
      description: "Show detailed logs",
    }
  })

  .command(
    `run`,
    "this command runs the program as a server (GitLab webhook) at specific port",
    (argv) => {
      Config.addPortOption(argv);
      Config.addGitlabServerUrlOption(argv);
    },
    (args) => {
      const config = new Config(args);
      const logger = config.logger;
      logger.log(`Command: run`);
      const server = new Server(config);
      server.run();
    }
  )

  .command(
    `test-notify`,
    "this command notifies a device for debug pourposes only",
    (argv) => {
      Config.addDeviceTokenOption(argv);
      Config.addGitlabServerUrlOption(argv);
    },
    (args) => {
      const config = new Config(args);
      const logger = config.logger;
      logger.log(`Command: notify`);
      const gitlabServerUrl = config.getGitlabServerUrl();
      const deviceToken = config.getDeviceToken();
      const sender = new Sender(logger, gitlabServerUrl);
      sender.testMessage(deviceToken).subscribe( (v) => logger.print("L"+v?.toString()));
    }
  )


  .strict()
  .help()
  .version()
  .demandCommand()
  .recommendCommands()
  .showHelpOnFail(true)
  .epilogue(`For more information, check out the documentation at https://github.com/andreclinio/glhv-webhook-server`)
  .argv
  ;




