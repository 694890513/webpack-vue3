const { merge } = require("webpack-merge");
const webpack = require("webpack");
const { resolve } = require("./utils.ts");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.base.config");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

module.exports = function (env, argv) {
  const nodeEnv = env.test ? "test" : env.dev ? "development" : "production";
  const isTest = nodeEnv === "test";
  const analyzerPlugins = env.analyzer
    ? [
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
          reportFilename: resolve("./report/report.html"),
          statsFilename: resolve("./report/stats.json"),
        }),
      ]
    : [];
  return merge(common, {
    mode: "production",
    optimization: {
      // chunk拆分
      splitChunks: {
        chunks: 'all', // 三个枚举值： async 异步加载导入的模块 import('module').then() ; initial 直接import导入的模块 ; all 包含上述两种情况
        minSize: 20000, // 生成chunk最小的大小
        enforceSizeThreshold: 20000, // 当chunk的大小超过此值将强制拆分
        cacheGroups: {
          vueI18n: {
            test: /[\\/]node_modules[\\/](vue-i18n)[\\/]/,
            name: 'vue-i18n',
            chunks: 'all',
          },
          coreJs: {
            test: /[\\/]node_modules[\\/](core-js)[\\/]/,
            name: 'core-js',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
          },
        }
      },
      // 压缩
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
      // tree shaking
      usedExports: true,
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: false,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: ["postcss-preset-env"],
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                additionalData: `
                  @use "@/assets/styles/variables.scss" as *;
                  @use "@/assets/styles/mixin.scss" as *;
                `,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
        chunkFilename: "css/[name].[contenthash].css",
      }),
      new CssMinimizerPlugin(),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
      }),
      new webpack.DefinePlugin({
        "process.env.VITE_API_URL": JSON.stringify(
          isTest ? "https://sitlotteryapi.22889.club" : "https://vn168api.com"
        ),
        "process.env.VITE_BASE_URL": JSON.stringify(
          isTest ? "https://websiteapi.22889.club" : "https://hg1922.com"
        ),
        "process.env.VITE_BASE_MERCHANT": JSON.stringify(
          isTest ? 9999999 : 8888002
        ),
      }),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        disable: isTest,
        pngquant: {
          quality: "95-100",
        },
      }),
      ...analyzerPlugins,
    ],
    output: {
      path: resolve("dist"),
      filename: "js/[name].[contenthash].js",
      chunkFilename: "js/[name].[contenthash].js",
    },
  });
};
