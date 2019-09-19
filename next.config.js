require('dotenv').config()

const fs = require('fs')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const envFile = path.join(__dirname, '.env')

module.exports = {
  webpack: config => {
    // bundle .env file contents
    if (fs.existsSync(envFile)) {
      config.plugins = [
        ...(config.plugins || []),
        new Dotenv({ path: envFile, systemvars: true })
      ]
    }

    // map baseUrl and paths from tsconfig.json
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin()
    ]

    return config
  }
}
