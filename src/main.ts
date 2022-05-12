#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { Config } from "./config";
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
    "run",
    (argv) => {
      Config.addPortOption(argv);
      Config.addTokenOption(argv);
      Config.addApplicationNameOption(argv);
    },
    (args) => {
      const config = new Config(args);
      const server = new Server(config);
      server.run();
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




