const path = require("path");

function merge(obj1, obj2) {
  const merged = Object.assign({}, obj1);

  for (prop in obj2) {
    const sourceValue = obj2[prop];
    const targetValue = obj1[prop];

    if (
      sourceValue &&
      Array.isArray(sourceValue) &&
      targetValue &&
      Array.isArray(targetValue)
    ) {
      merged[prop] = targetValue.concat(sourceValue);
    } else if (
      typeof targetValue === "object" &&
      typeof sourceValue === "object"
    ) {
      merged[prop] = merge(targetValue, sourceValue);
    } else {
      merged[prop] = sourceValue;
    }
  }

  return merged;
}

function addMonacoWebpackConfig(config, includeAllLanguages) {
  if (Array.isArray(config) || typeof config === "function") {
    throw new Error(
      "config passed to addMonacoConfig must be an object, not an array or function."
    );
  }

  const { entry, output } = config;
  if (!entry || typeof entry !== "object") {
    throw new Error(
      `config.entry passed to addMonacoWebpackConfig must be an object. Got: ${JSON.stringify(
        entry
      )}`
    );
  }

  // Somewhat based on https://github.com/microsoft/monaco-editor/blob/master/docs/integrate-esm.md
  return {
    ...config,
    entry: {
      ...entry,
      "editor.worker": "@uifabric/monaco-editor/esm/vs/editor/editor.worker.js",
      "ts.worker":
        "@uifabric/monaco-editor/esm/vs/language/typescript/ts.worker.js",
      ...(includeAllLanguages
        ? {
            "css.worker":
              "@uifabric/monaco-editor/esm/vs/language/css/css.worker.js",
            "html.worker":
              "@uifabric/monaco-editor/esm/vs/language/html/html.worker.js",
            "json.worker":
              "@uifabric/monaco-editor/esm/vs/language/json/json.worker.js",
          }
        : {}),
    },
    output: {
      ...output,
      // required for monaco--see https://github.com/webpack/webpack/issues/6642
      globalObject: "self",
    },
  };
}

function createConfig(config, { bundleName, isProduction }) {
  return merge(
    {
      output: {
        filename: `${bundleName}.[name].[contenthash:9].js`,
        path: path.resolve(process.cwd(), "dist"),
      },

      resolveLoader: {
        modules: [
          "node_modules",
          path.resolve(process.cwd(), "node_modules"),
          path.resolve(__dirname, "loaders"),
        ],
      },

      resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: ["node_modules", path.resolve(process.cwd(), "node_modules")],
      },

      module: {
        rules: [
          {
            test: /\.(png|jpg|svg)$/i,
            exclude: /node_modules/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 8192,
                },
              },
            ],
          },
          {
            test: /\.(jpeg|gif|ico)$/,
            exclude: /node_modules/,
            use: ["file-loader?name=[name].[ext]"],
          },
          {
            test: /\.(ts|tsx)$/,
            loader: "ts-loader",
          },
          {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader",
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(ttf|eot|woff|woff2)$/,
            use: ["file-loader?name=[name].[ext]"],
          },
        ],
      },

      devtool: isProduction ? "source-map" : "cheap-module-source-maps",

      mode: isProduction ? "production" : "development",

      optimization: {
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            react: {
              test: /node_modules[\\\/](?:react|react-dom)[\\\/]/,
            },
            fabric: {
              test: /node_modules[\\\/](?:(office-ui-fabric-react)|(@uifabric)[\\\/])/,
            },
            vendors: false,
          },
        },
      },
    },
    config
  );
}

module.exports = {
  createConfig,
  addMonacoWebpackConfig,
};
