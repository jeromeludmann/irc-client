const path = require("path");

const mode = "development";

const devtool = "eval-source-map";

const resolve = {
  extensions: [".ts", ".tsx", ".js"],
  alias: {
    "@app": path.resolve(__dirname, "src"),
  },
};

const rules = {
  ts: ({ tsconfigPath }) => ({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "ts-loader",
        options: {
          configFile: tsconfigPath,
        },
      },
      "tslint-loader",
    ],
  }),
};

const mainConfig = {
  mode,
  devtool,
  resolve,
  target: "electron-main",
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [rules.ts({ tsconfigPath: "../tsc.main.json" })],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};

const rendererConfig = {
  mode,
  devtool,
  resolve,
  target: "electron-renderer",
  entry: "./src/renderer.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "renderer.js",
  },
  module: {
    rules: [rules.ts({ tsconfigPath: "../tsc.renderer.json" })],
  },
};

module.exports = [mainConfig, rendererConfig];
