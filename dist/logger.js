"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(verbose) {
        this.verbose = verbose;
        this.log(`Verbose mode: ${verbose}`);
    }
    log(text) {
        if (!this.verbose)
            return;
        this.toConsole(`[LOG]: ${text}`);
    }
    logUrl(url) {
        this.log(`URL -> ${Logger.toCyan(url)}`);
    }
    exit(text) {
        this.toConsole(`[EXIT]: ${Logger.toRed(text)}`);
        process.exit(1);
    }
    print(text) {
        this.toConsole(`${text}`);
    }
    printItem(text, level) {
        const ident = !level ? 1 : level;
        const str = `${" ".repeat((ident - 1) * 3)}- ${text}`;
        this.toConsole(str);
    }
    static toRed(text) {
        return `${Logger.RED}${text}${Logger.RESET}`;
    }
    static toGreen(text) {
        return `${Logger.GREEN}${text}${Logger.RESET}`;
    }
    static toYellow(text) {
        return `${Logger.YELLOW}${text}${Logger.RESET}`;
    }
    static toCyan(text) {
        return `${Logger.CYAN}${text}${Logger.RESET}`;
    }
    static toMagenta(text) {
        return `${Logger.MAGENTA}${text}${Logger.RESET}`;
    }
    static toBold(text) {
        return `${Logger.BOLD}${text}${Logger.RESET}`;
    }
    static dthr(moment) {
        if (!moment)
            return "?";
        return `${moment.format("DD/MM/YYYY HH:mm:ss")}`;
    }
    static presentation() {
        const text = "\n" +
            Logger.toBold("GitLab High Views WebHook Server - Hooker for GitLab\n") +
            "Author: André Luiz Clinio (andre.clinio@gmail.com)\n";
        // tslint:disable-next-line:no-console
        console.info(text);
    }
    toConsole(text) {
        // tslint:disable-next-line:no-console
        console.info(text);
    }
}
exports.Logger = Logger;
Logger.RED = "\x1b[31m";
Logger.YELLOW = "\x1b[33m";
Logger.GREEN = "\x1b[32m";
Logger.CYAN = "\x1b[36m";
Logger.MAGENTA = "\x1b[35m";
Logger.BOLD = "\x1b[1m";
Logger.RESET = "\x1b[0m";
