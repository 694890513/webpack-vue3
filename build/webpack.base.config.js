const { VueLoaderPlugin } = require("vue-loader");
const { resolve, babelLoaderConf } = require('./utils.ts')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const webpack = require('webpack');

module.exports = {
  entry: {
    app: resolve("src/main.ts"),
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts", ".tsx", ".mjs"],
    alias: {
      "@": resolve("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
          },
        ],
        include: /(src)/,
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/assets/svg')],
        options: {
          symbolId: 'icon-[name]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "images/[base]",
        },
        exclude: [resolve("src/assets/svg")],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset",
        generator: {
          filename: "files/[base]",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset",
        generator: {
          filename: "media/[base]",
        },
      },
      {
        test: /\.(ts|js)x?$/,
        use: [babelLoaderConf],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // postcss-preset-env 内部集成了 autoprefixer 添加css第三方前缀
                plugins: ['postcss-preset-env'],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `	
                @use "@/assets/styles/variables.scss" as *;  // 全局导入sass变量
                @use "@/assets/styles/mixin.scss" as *; // 全局导入sass混入
              `,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // vue-loader插件
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve("public/index.html"),
      // favicon: resolve("public/favicon.ico"),
      inject: true,
    }),
    new CleanWebpackPlugin(),
    // css抽离
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
    new CssMinimizerPlugin(), // css-minimizer-webpack-plugin 插件可以优化、压缩 CSS文件
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  // 使用 cache: filesystem 可以缓存构建过程的 webpack 模板，在二次构建时提速。
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename], // 针对构建的额外代码依赖的数组对象。webpack 将使用这些项和所有依赖项的哈希值来使文件系统缓存失效。
    },
    cacheDirectory: resolve('temp_cache'),
    name: 'scf-cache', // 路径temp_cache/scf-cache
    compression: 'gzip',
  },
};
