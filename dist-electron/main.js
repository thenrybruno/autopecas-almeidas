"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const electron_updater_1 = require("electron-updater");
const fs_1 = __importDefault(require("fs"));
let mainWindow = null;
let splash = null;
let server;
function setupDatabase() {
    const userData = electron_1.app.getPath("userData");
    const dbPath = path_1.default.join(userData, "database.db");
    if (!fs_1.default.existsSync(dbPath)) {
        console.log("Banco não encontrado, criando banco...");
        try {
            (0, child_process_1.execSync)("npx tsx scripts/setupDatabase.ts", { stdio: "inherit" });
        }
        catch (error) {
            console.log("Erro ao configurar o banco de dados...", error);
        }
    }
    else {
        console.log("Banco já existe.");
    }
}
function startServer() {
    server = (0, child_process_1.spawn)("node", [
        path_1.default.join(__dirname, "../.next/standalone/server.js")
    ]);
}
function createSplash() {
    splash = new electron_1.BrowserWindow({
        width: 500,
        height: 400,
        frame: false,
        transparent: false,
        alwaysOnTop: true
    });
    splash.loadFile("electron/splash.html");
}
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        show: false,
        icon: path_1.default.join(__dirname, "../electron-build/icon.ico"),
        webPreferences: {
            preload: path_1.default.join(__dirname, "preload.js"),
            contextIsolation: true
        }
    });
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.once("ready-to-show", () => {
        splash?.destroy();
        mainWindow?.show();
    });
}
electron_1.app.whenReady().then(() => {
    createSplash();
    setupDatabase();
    startServer();
    electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
    setTimeout(() => {
        createWindow();
    }, 4000);
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        if (server)
            server.kill();
        electron_1.app.quit();
    }
});
