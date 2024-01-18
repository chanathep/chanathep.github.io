const path = require('path');

module.exports = {
  mode: 'development', // or 'production' or 'none'
  // The entry point of the web application
  entry: './src/index.js',
  // The output configuration of the web application
  output: {
    // The name of the output file
    filename: 'main.js',
    // The path of the output folder
    path: path.resolve(__dirname, 'dist'),
    // The public path of the output folder
    publicPath: ''
  },
  // The development server configuration of the web application
  devServer: {
    // The port of the development server
    port: 3000,
    // The content base of the development server
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // A regex to match CSS files
        use: ["style-loader", "css-loader"], // An array of loaders to apply
      },
    ],
  },
};
