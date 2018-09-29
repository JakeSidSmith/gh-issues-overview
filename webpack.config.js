const createWebpackConfig = require('@dabapps/create-webpack-config');

module.exports = createWebpackConfig({
  input: './src/client/index.tsx',
  outDir: './dist/',
  rootDir: './src/',
  tsconfig: './tsconfig.dist.json',
  env: {
    NODE_ENV: 'production',
    GITHUB_CLIENT_ID: undefined,
    GITHUB_CLIENT_SECRET: undefined
  },
  rawFileExtensions: ['html']
});
