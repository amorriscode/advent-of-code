import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'

module.exports = {
  input: 'main.js',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    dynamicImportVars({
      // options
    }),
  ],
}
