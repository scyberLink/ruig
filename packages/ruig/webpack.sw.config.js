/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')

module.exports = {
  mode: 'production', // or 'development' if you want unminified output
  entry: './src/workers/sw.ts',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'lib/workers'), // Output directory
    filename: 'sw.min.js', // Output filename
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfigworkers.json', // Use the specified TypeScript configuration file
        },
        exclude: /node_modules/,
      },
    ],
  },
}
