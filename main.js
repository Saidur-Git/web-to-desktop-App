// main.js
const { app, BrowserWindow, Menu, net } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: getIconPath(), // Set taskbar icon dynamically
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "./App/preload.js"),
    },
  });

  loadApp();

  // Remove the menu bar
  Menu.setApplicationMenu(null);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

// Function to determine the correct icon path based on OS
function getIconPath() {
  return process.platform === "win32"
    ? path.join(__dirname, "Assets", "icon.ico") // Windows (.ico)
    : path.join(__dirname, "Assets", "icon.png"); // macOS/Linux (.png)
}

// Function to load the online page or fallback offline page
function loadApp() {
  if (isOnline()) {
    mainWindow.loadURL("https://ui.aceternity.com/");
  } else {
    mainWindow.loadFile(path.join(__dirname, "./App/404.html"));
  }
}

// Function to check internet connectivity
function isOnline() {
  return net.online;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
