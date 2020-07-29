## ts-react-proj
* Got this error after finishing the tutorial (https://www.typescriptlang.org/docs/handbook/react-&-webpack.html): 'ERROR in Entry module not found: Error: Can't resolve './src/Index.tsx' in '.../ts-react-proj'
* Webpack file looked like this:
  ```
  module.exports = {
      mode: "production",
      // Enable sourcemaps for debugging webpack's output.
      devtool: "source-map",
      resolve: {
          // Add '.ts' and '.tsx' as resolvable extensions.
          extensions: [".ts", ".tsx"]
      },
      module: {
          rules: [
              {
                  test: /\.ts(x?)$/,
                  exclude: /node_modules/,
                  use: [
                      {
                          loader: "ts-loader"
                      }
                  ]
              },
              // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
              {
                  enforce: "pre",
                  test: /\.js$/,
                  loader: "source-map-loader"
              }
          ]
      },

      // When importing a module whose path matches one of the following, just
      // assume a corresponding global variable exists and use that instead.
      // This is important because it allows us to avoid bundling all of our
      // dependencies, which allows browsers to cache those libraries between builds.
      externals: {
          "react": "React",
          "react-dom": "ReactDOM"
      }
  };
  ```
* Soln: add an entry file in the webpack config (I also changed the index.tsx file to lowercase based on what I saw elsewhere). New webpack file looked like:
  ```
  // const path = require('path');

  module.exports = {
      mode: "production",
      // Enable sourcemaps for debugging webpack's output.
      devtool: "source-map",
      resolve: {
          // Add '.ts' and '.tsx' as resolvable extensions.
          extensions: [".ts", ".tsx"]
      },
      entry: './src/index.tsx',
      module: {
          rules: [
              {
                  test: /\.ts(x?)$/,
                  exclude: /node_modules/,
                  use: [
                      {
                          loader: "ts-loader"
                      }
                  ]
              },
              // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
              {
                  enforce: "pre",
                  test: /\.js$/,
                  loader: "source-map-loader"
              }
          ]
      },
      // output: {
      //     filename: 'bundle.js',
      //     path: path.resolve(__dirname, 'dist')
      // },
      // When importing a module whose path matches one of the following, just
      // assume a corresponding global variable exists and use that instead.
      // This is important because it allows us to avoid bundling all of our
      // dependencies, which allows browsers to cache those libraries between builds.
      externals: {
          "react": "React",
          "react-dom": "ReactDOM"
      }
  };
  ```