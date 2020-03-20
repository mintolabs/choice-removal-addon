const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const GasPlugin = require('gas-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WebpackCleanPlugin = require('webpack-clean')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin')

const Dotenv = require('dotenv-webpack')

const src = path.resolve(__dirname, 'src')
const destination = path.resolve(__dirname, 'dist')
const htmlTemplate = './src/client/templates/index.html'

// Client entry points:
const clientEntryPoints = [
  {
    name: 'CLIENT - Configuration sidebar',
    entry: './src/client/entries/configuration.jsx',
    filename: 'Configuration.html',
  },
]

/*********************************
 *       Declare settings
 ********************************/

// any shared client & server settings
const sharedConfigSettings = {
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
}

// eslint settings, to check during build if desired
const eslintConfig = {
  enforce: 'pre',
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    cache: false,
    failOnError: false,
    fix: true,
  },
}

// appscript copy settings, to copy this file over to the destination directory
const appsscriptConfig = {
  name: 'COPY APPSSCRIPT.JSON',
  entry: './appsscript.json',
  plugins: [
    new CleanWebpackPlugin([destination]),
    new CopyWebpackPlugin([
      {
        from: './appsscript.json',
      },
    ]),
  ],
}

const emailTemplatesConfig = {
  name: 'COPY Email Templates',
  entry: './appsscript.json',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: `${path.resolve(src, 'client', 'emailTemplates')}/**/*.html`,
        flatten: true,
        to: destination,
      },
    ]),
  ],
}

const clientConfig = {
  ...sharedConfigSettings,
  output: {
    path: path.resolve(__dirname, destination),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      config: path.resolve(__dirname, 'src/client/config'),
      containers: path.resolve(__dirname, 'src/client/containers'),
      components: path.resolve(__dirname, 'src/client/components'),
      store: path.resolve(__dirname, 'src/client/store'),
      helpers: path.resolve(__dirname, 'src/client/helpers'),
      icons: path.resolve(__dirname, 'src/client/icons'),
      utils: path.resolve(__dirname, 'src/client/utils'),
    },
  },
  module: {
    rules: [
      // turned off by default, but uncomment below to run linting during build
      // eslintConfig,
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        /**
         * Check this article: https://www.robinwieruch.de/react-svg-icon-components/
         */
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              template: (
                { template },
                opts,
                { imports, componentName, props, jsx, exports }
              ) => template.ast`
                ${imports}
                import useWithViewbox from '../utils/hooks/useWithViewbox';

                const ${componentName} = (${props}) => {
                  const ref = React.createRef();

                  useWithViewbox(ref);

                  props = { ...props, ref };

                  return ${jsx};
                };

                export default ${componentName};
              `,
            },
          },
        ],
      },
    ],
  },
}

const clientConfigs = clientEntryPoints.map(clientEntryPoint => {
  return {
    ...clientConfig,
    name: clientEntryPoint.name,
    entry: clientEntryPoint.entry,
    plugins: [
      new HtmlWebpackPlugin({
        template: htmlTemplate,
        filename: clientEntryPoint.filename,
        inlineSource: '^[^(//)]+.(js|css)$', // embed all js and css inline, exclude packages with '//' for dynamic cdn insertion
      }),
      new DynamicCdnWebpackPlugin(),
      new HtmlWebpackInlineSourcePlugin(),
      new Dotenv(),
      new WebpackCleanPlugin(['main.js'], {
        basePath: path.join(__dirname, 'dist'),
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  }
})

const serverConfig = {
  ...sharedConfigSettings,
  name: 'SERVER',
  entry: './src/server/code.js',
  output: {
    filename: 'Code.gs',
    path: path.resolve(__dirname, destination),
    libraryTarget: 'this',
  },
  module: {
    rules: [
      // turned off by default, but uncomment below to run linting during build
      // eslintConfig,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            properties: false,
          },
          mangle: false,
          module: false,
          output: {
            beautify: true,
          },
          toplevel: false,
          nameCache: null,
          ie8: true,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
    ],
  },
  plugins: [new GasPlugin(), new Dotenv()],
}

module.exports = [
  // 1. Copy the appscript file.
  appsscriptConfig,
  // 2. One client bundle for each client entrypoint.
  ...clientConfigs,
  // 3. Bundle the server
  serverConfig,
  // 4. Email template (HTML only)
  emailTemplatesConfig,
]
