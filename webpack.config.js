const path = require("path");

const shared = {
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "react-native": "react-native-web",
      "@app": path.resolve(__dirname, "src"),
    },
  },
};

module.exports = [
  {
    ...shared,
    target: "electron-main",
    entry: "./src/main.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                configFile: "../tsc/main.json",
              },
            },
            "tslint-loader",
          ],
        },
      ],
    },
    node: {
      __dirname: false,
      __filename: false,
    },
  },
  {
    ...shared,
    target: "electron-renderer",
    entry: "./src/renderer.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "renderer.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                configFile: "../tsc/renderer.json",
              },
            },
            "tslint-loader",
          ],
        },
      ],
    },
  },
];
