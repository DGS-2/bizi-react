import webpack from 'webpack';

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "sass-loader"
        },
        options: {
          sourceMap: true
        }
      }
    ]
  }
}