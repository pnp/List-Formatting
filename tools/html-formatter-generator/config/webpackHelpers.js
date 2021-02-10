const path = require("path");

function merge(obj1, obj2) {
  const merged = Object.assign({}, obj1);

  for (prop in obj2) {
    const sourceValue = obj2[prop];
    const targetValue = obj1[prop];

    if (sourceValue && Array.isArray(sourceValue) && targetValue && Array.isArray(targetValue)) {
      merged[prop] = targetValue.concat(sourceValue);
    } else if (typeof targetValue === "object" && typeof sourceValue === "object") {
      merged[prop] = merge(targetValue, sourceValue);
    } else {
      merged[prop] = sourceValue;
    }
  }

  return merged;
}

function createConfig(config, { bundleName, isProduction }) {
  return merge(
    {
      output: {
        filename: `${bundleName}.[name].[contenthash:9].js`,
        path: path.resolve(process.cwd(), "dist")
      },

      resolveLoader: {
        modules: [
          "node_modules",
          path.resolve(process.cwd(), "node_modules"),
          path.resolve(__dirname, "loaders")
        ]
      },

      resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: ["node_modules", path.resolve(process.cwd(), "node_modules")]
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
                  limit: 8192
                }
              }
            ]
          },
          {
            test: /\.(jpeg|gif|ico)$/,
            exclude: /node_modules/,
            use: ["file-loader?name=[name].[ext]"]
          },
          {
            test: /\.(ts|tsx)$/,
            loader: "ts-loader"
          },
          {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.(ttf|eot|woff|woff2)$/,
            use: ["file-loader?name=[name].[ext]"]
          }
        ]
      },

      devtool: isProduction ? "source-map" : "cheap-module-source-maps",

      mode: isProduction ? "production" : "development",

      optimization: {
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            react: {
              test: /node_modules[\\\/](?:react|react-dom)[\\\/]/
            },
            vendors: false
          }
        }
      }
    },
    config
  );
}

module.exports = {
  createConfig
};
