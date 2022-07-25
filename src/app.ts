import { app, session, BrowserWindow } from "electron"
import { CONSTANTS } from "./constants"
import { readFile } from "fs"
import path from "path"

const createWindow = () => {
    const window = new BrowserWindow({
        width: CONSTANTS.width,
        height: CONSTANTS.height,
        icon: path.join(__dirname, "../build/icon.png"),
        webPreferences: {
            webSecurity: false
        }
    })

    window.setMenu(null)
    // window.webContents.openDevTools()

    session.defaultSession.webRequest.onHeadersReceived({ urls: ["<all_urls>"] }, (details, callback) => {
        const responseHeaders = details.responseHeaders as Record<string, string[]>
        delete responseHeaders["content-security-policy"]
        delete responseHeaders["x-frame-options"]
        callback({
            responseHeaders
        })
    })

    session.defaultSession.webRequest.onBeforeRequest({ urls: ["https://code.prodigygame.com/code/*/game.min.js?v=*"] }, (details, callback) => {
        readFile(path.join(__dirname, "patches.js"), (err, data) => {
            if (err) {
                throw err
            }
            window.webContents.executeJavaScript(data.toString())
        })
        callback({ cancel: true })
    })

    window.loadURL("https://play.prodigygame.com/", { userAgent: CONSTANTS.userAgent })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
