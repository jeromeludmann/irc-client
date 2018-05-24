import { app, BrowserWindow } from "electron";
import { resolve } from "path";

let window: Electron.BrowserWindow | null;

interface EncodedUriHtmlArgs {
  appTitle: string;
  entryPath: string;
  rootElementId: string;
}

function getEncodedUriHtml({
  appTitle,
  entryPath,
  rootElementId,
}: EncodedUriHtmlArgs) {
  return encodeURIComponent(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>${appTitle}</title>
    </head>
    <body>
        <div id="${rootElementId}" />
        <script>
          require('${entryPath}');
        </script>
    </body>
    </html>
  `);
}

function createWindow() {
  // Create the browser window.
  window = new BrowserWindow({
    height: 600,
    width: 800,
  });

  // and load the encoded URI HTML of the app.
  window.loadURL(
    `data:text/html;charset=UTF-8,${getEncodedUriHtml({
      appTitle: "irc-client",
      entryPath: resolve(__dirname, "renderer.js"),
      rootElementId: "root",
    })}`,
  );

  // Open the DevTools.
  window.webContents.openDevTools();

  // Emitted when the window is closed.
  window.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (window === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
