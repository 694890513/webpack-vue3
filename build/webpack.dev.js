const { merge } = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.base.config");
const { resolve } = require("./utils.ts");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");

const devWebpackConfig = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [],
  },
  output: {
    path: resolve("dist"),
    filename: "js/[name].[fullhash].js",
    chunkFilename: "js/[name].[fullhash].js",
    publicPath: "/",
  },
  // 日志打印只打印错误和警告
  stats: "errors-warnings",
  devServer: {
    host: "0.0.0.0",
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/g,
          to: "/index.html",
        },
      ],
    },
    allowedHosts: "all",
    port: 8080, // 端口号
    open: false, // 自动打开
    hot: true, // 热更新
    client: {
      progress: false, // 将运行进度输出到控制台。
      overlay: { warnings: false, errors: true }, // 全屏显示错误信息
    },
    compress: true, // 为所有服务启用gzip 压缩
    proxy: {
      "/api": {
        target: "...",
        changeOrigin: true, // 是否是跨域请求
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_I18N_FULL_INSTALL__: JSON.stringify(true),
      __VUE_I18N_LEGACY_API__: JSON.stringify(false),
    }),
  ],
});

devWebpackConfig.plugins.push(
  // 进度条
  new ProgressBarPlugin({
    format: ` :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    clear: true,
  }),
  // 错误提示
  new FriendlyErrorsWebpackPlugin({
    // 成功的时候输出
    compilationSuccessInfo: {
      messages: [
        `Your application is running here: http://${devWebpackConfig.devServer.host}:${devWebpackConfig.devServer.port}`,
      ],
    },
    // 是否每次都清空控制台
    clearConsole: true,
  })
);

module.exports = devWebpackConfig;
