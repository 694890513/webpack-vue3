const { merge } = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.base.conf");
const { resolve } = require('./utils.ts')

module.exports = function (env, argv) {
  const analyzerPlugins = env.analyzer
    ? [
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
          //   generateStatsFile: true,
          reportFilename: resolve("./report/report.html"),
          statsFilename: resolve("./report/stats.json"),
        }),
      ]
    : [];
  const nodeEnv = env.dev ? "development" : env.test ? "test" : "production";
  return merge(common, {
    mode: "production",
    devtool: "source-map",
    module: {
      rules: [],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(nodeEnv),
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      }),
      analyzerPlugins
    ],
    output: {
      path: resolve("dist"),
      filename: "js/[name].[hash].js",
      chunkFilename: "js/[name].[hash].js",
    },
  });
};
