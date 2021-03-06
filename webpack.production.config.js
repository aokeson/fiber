var path = require('path');
var webpack = require('webpack');

module.exports = { // Export the configuration file
  entry: { // Entry point for the bundle, so all these modules are loaded on startup
    app : [ // App folder
      './lib/index.js'], // How to host
  },
  output: { // Options that affect the output
    path: path.join(__dirname, './public/js/'), // Location of where to output to
    filename: `app.js`, // Ppecifies the name of the file to output to
    publicPath: '/js/' // Specifies the public URL address of the output files when referenced in a browser
  },
  plugins: [ // Add additional plugins to the compiler
    new webpack.DefinePlugin({ // Define new variables in the development build
        'process.env': { // new variable
          'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({ // Minimize the JavaScript. Put it in unreadable chunks.
    }),
  ],
  node: { // Various Node settings
    fs: "empty" // Exclude fs (file system) node module
  },
  resolve: { // Options affecting the resolve of modules
    alias: { // Used to replace modules with other modules or paths
      'react': path.join(__dirname, 'node_modules', 'react') // Include a path to React
    },
    extensions: ['', '.js'] // Array of extensions to help discover Node modules ending in .js
  },
  resolveLoader: { // Same as resolve, but what to do if loaders are not found
    'fallback': path.join(__dirname, 'node_modules') // Where Node modules are
  },
  module: { // Options affecting the normal modules
    loaders: [ // Arrary of automatically applied loaders
    {
      test: /\.js$/, // Condition must be met - must be a javascript file
      loaders: ['react-hot', 'babel'], // List of preprocessed files, React and Babel
      exclude: /node_modules/, // Condition that must not be met, exclude exceptions in this case things in node_modules
      include: [path.join(__dirname,'./lib')] // Used to match the directories
    },
    {
      test: /\.xml$/, // Load raw xml
      loader: "raw"
    },
    {
      test: /\.json$/, // Use the json-loader to load files ending with .json
      loaders: ['json-loader']
    },
    {
      test: /\.css?$/, // Load anything with .css using style and raw loaders
      loaders: ['style', 'raw'],
      include: __dirname
    }]
  }
};
