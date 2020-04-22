const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    "./src/js/script.js",
    "./src/scss/style.scss"
  ],
  output: {
    filename: "./js/bundle.js"
  },
  devtool: "source-map",
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, "src/js"),
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, "src/scss"),
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader",
              options: {
                sourceMap: true,
                url: false
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "./css/style.bundle.css",
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/html/index.html"
    })
  ]
};
