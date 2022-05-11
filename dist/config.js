"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const logger_1 = require("./logger");
class Config {
    constructor(args) {
        this._logger = new logger_1.Logger(args.verbose);
        this._args = args;
    }
    static addPortOption(argv) {
        return argv.option(Config.PORT_TAG, {
            type: "number",
            alias: "p",
            default: 44000,
            demandOption: true,
            description: "Set the server port",
        });
    }
    getPort() {
        const port = this._args[Config.PORT_TAG];
        this._logger.log(`port: ${port}`);
        return port;
    }
    get logger() {
        return this._logger;
    }
}
exports.Config = Config;
Config.PORT_TAG = "port";
