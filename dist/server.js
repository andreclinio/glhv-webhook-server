"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
class Server {
    constructor(config) {
        this.port = config.getPort();
        this.logger = config.logger;
    }
    run() {
        this.logger.log(`Server is starting...`);
        const app = (0, express_1.default)();
        app.get('/', (req, res) => {
            res.send(`${req.body}`);
        });
        app.listen(this.port, () => {
            this.logger.log(`Server is running at localhost:${this.port}`);
        });
    }
}
exports.Server = Server;
