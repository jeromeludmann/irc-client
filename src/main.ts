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
  rootElementId
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
  window = new BrowserWindow({
    height: 600,
    width: 800
  });

  window.loadURL(
    `data:text/html;charset=UTF-8,${getEncodedUriHtml({
      appTitle: "irc-client",
      entryPath: resolve(__dirname, "renderer.js"),
      rootElementId: "root"
    })}`
  );

  window.webContents.openDevTools();

  window.on("closed", () => {
    window = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (window === null) {
    createWindow();
  }
});
