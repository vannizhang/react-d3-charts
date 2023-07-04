const path = require('path');
const package = require('./package.json');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    /**
     *  clean the /dist folder before each build
     */
    clean: true,
  },
  /**
   * The resolve configuration in webpack.config.js tells Webpack which file extensions it should try when resolving module imports.
   * Specifically, the extensions option specifies an array of file extensions that Webpack should look for when resolving imports.
   */
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
  },
  module: {
    rules: [
       {
            test: /\.(ts|tsx)$/,
            loader: 'babel-loader',
       },
       {
            test: /\.css$/i,
            include: path.resolve(__dirname, 'src'),
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader", 
                    options: {
                        sourceMap: true
                    }
                },
            ],
        },
        { 
            test: /\.(png|jpg|gif|svg)$/,  
            loader: "file-loader",
            options: {
                name: '[name].[ext]',
            }
        },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin()
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
    }),
  ]
};