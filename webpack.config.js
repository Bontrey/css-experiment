const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./libs/parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = merge(
  {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    devtool: 'eval-source-map'
  },
  parts.indexTemplate({
    title: 'Demo',
    appMountId: 'app'
  }), 
  parts.loadJSX(PATHS.app),
  parts.extractCss(PATHS.app)
);

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        output: {
          publicPath: '/css-experiment/'
        },
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.extractBundle({
        name: 'vendor',
        entries: ['react']
      })
    );
    break;
  default:
		config = merge(
      common,
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

// Run validator in quiet mode to avoid output in stats
module.exports = validate(config, {
  quiet: true
});

