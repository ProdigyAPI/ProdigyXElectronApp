"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const constants_1 = require("./constants");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const createWindow = () => {
    const window = new electron_1.BrowserWindow({
        width: constants_1.CONSTANTS.width,
        height: constants_1.CONSTANTS.height,
        icon: path_1.default.join(__dirname, "../build/icon.png"),
        webPreferences: {
            webSecurity: false
        }
    });
    window.setMenu(null);
    // window.webContents.openDevTools()
    electron_1.session.defaultSession.webRequest.onHeadersReceived({ urls: ["<all_urls>"] }, (details, callback) => {
        const responseHeaders = details.responseHeaders;
        delete responseHeaders["content-security-policy"];
        delete responseHeaders["x-frame-options"];
        callback({
            responseHeaders
        });
    });
    electron_1.session.defaultSession.webRequest.onBeforeRequest({ urls: ["https://code.prodigygame.com/code/*/game.min.js?v=*"] }, (details, callback) => {
        (0, fs_1.readFile)(path_1.default.join(__dirname, "patches.js"), (err, data) => {
            if (err) {
                throw err;
            }
            window.webContents.executeJavaScript(data.toString());
        });
        callback({ cancel: true });
    });
    window.loadURL("https://play.prodigygame.com/", { userAgent: constants_1.CONSTANTS.userAgent });
};
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
