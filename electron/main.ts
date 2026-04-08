import { execSync, spawn } from "child_process";
import { BrowserWindow, app } from "electron";
import path from "path";
import { autoUpdater } from "electron-updater"
import fs from "fs"

let mainWindow: BrowserWindow | null = null
let splash: BrowserWindow | null = null
let server: any

function setupDatabase() {

    const userData = app.getPath("userData")

    const dbPath = path.join(userData, "database.db")

    if (!fs.existsSync(dbPath)) {

        console.log("Banco não encontrado, criando banco...")

        try {

            execSync("npx tsx scripts/setupDatabase.ts", { stdio: "inherit" })

        } catch (error) {

            console.log("Erro ao configurar o banco de dados...", error)

        }
    } else {

        console.log("Banco já existe.")

    }

}

function startServer() {
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

    setupDatabase()

    createSplash()

    startServer()

    autoUpdater.checkForUpdatesAndNotify()

    setTimeout(() => {

        createWindow()

    }, 4000)

})

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {

        if (server) server.kill()

        app.quit()

    }

})