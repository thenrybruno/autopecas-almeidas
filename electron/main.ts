import { spawn } from "child_process";
import { BrowserWindow, app } from "electron";
import path from "path";
import { autoUpdater } from "electron-updater"

let mainWindow: BrowserWindow | null = null
let splash: BrowserWindow | null = null
let server: any

function startServer (){
    server = spawn("node", [
        path.join(__dirname, "../.next/standalone/server.js")
    ])
}

function createSplash() {

    splash = new BrowserWindow({
        width: 500,
        height: 400,
        frame: false,
        transparent: false,
        alwaysOnTop: true
    })

    splash.loadFile(path.join(__dirname, "splash.html"))

}

function createWindow() {

    mainWindow = new BrowserWindow({

        width: 1200,
        height: 800,

        icon: path.join(__dirname, "../build/icon.ico"),

        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true
        }
    })

    mainWindow.loadURL("http://localhost:3000")

    mainWindow.once("ready-to-show", () => {
        splash?.destroy()
        mainWindow?.show()

    })

}

app.whenReady().then(() => {
    
    createSplash()

    startServer()

    autoUpdater.checkForUpdatesAndNotify()

    setTimeout(() => {

        createWindow()

    }, 4000)

})

app.on("window-all-closed", () => {

    if(process.platform !== "darwin") {

        if(server) server.kill()

        app.quit()

    }

})