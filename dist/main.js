#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const config_1 = require("./config");
const server_1 = require("./server");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .scriptName("glhv-webhook-server")
    .usage(`$0 <command> <arguments> `)
    .options({
    verbose: {
        default: false,
        demandOption: false,
        type: "boolean",
        description: "Show detailed logs",
    }
})
    .command(`run`, "run", (argv) => {
    config_1.Config.addPortOption(argv);
}, (args) => {
    const config = new config_1.Config(args);
    const server = new server_1.Server(config);
    server.run();
})
    .strict()
    .help()
    .version()
    .demandCommand()
    .recommendCommands()
    .showHelpOnFail(true)
    .epilogue(`For more information, check out the documentation at https://github.com/andreclinio/glhv-webhook-server`)
    .argv;
