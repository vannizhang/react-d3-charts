const path = require('path');
const package = require('./package.json');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    /**
     * This exposes your library under all the module definitions, allowing it to work with CommonJS, AMD and as a global variable. 
     * 
     * In order to use `libraryTarget: 'umd'`, we need the `library` property to name your module.
     * 
     * Note that omitting the library will result in the assignment of all properties returned by the entry point be assigned directly to the root object
     * 
     * @see https://webpack.js.org/configuration/output/#librarytarget-umd
     */
    libraryTarget: 'umd',
    library: package.name,
    /**
     * To make UMD build available on both browsers and Node.js, set output.globalObject option to 'this'.
     * @see https://webpack.js.org/configuration/output/#outputglobalobject
     */
    globalObject: 'this',
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
            loader: 'ts-loader',
       },
       {
            test: /\.css$/i,
            include: path.resolve(__dirname, 'src'),
            use: ["style-loader", "css-loader"],
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
    // // new BundleAnalyzerPlugin()
    // new MiniCssExtractPlugin({
    //     // Options similar to the same options in webpackOptions.output
    //     // both options are optional
    //     filename: '[name].css',
    // }),
  ],
  /**
   * The externals configuration option provides a way of excluding dependencies from the output bundles. 
   * Instead, the created bundle relies on that dependency to be present in the consumer's (any end-user application) environment. 
   * This feature is typically most useful to library developers
   * 
   * @see https://webpack.js.org/configuration/externals/
   */
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    d3: 'd3'
  }
};