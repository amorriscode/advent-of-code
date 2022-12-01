import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import path from 'path'

module.exports = {
  input: 'main.js',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    dynamicImportVars({}),
    injectProcessEnv({
      NODE_PATH: path.resolve(__dirname),
    }),
  ],
}
