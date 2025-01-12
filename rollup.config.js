import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript'; // Add TypeScript plugin

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/better-cards.js',
    format: 'umd',
    name: 'BetterCards',
  },
  plugins: [
    typescript(),  // Use the TypeScript plugin to handle TS files
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-env',
        '@babel/preset-typescript', // Add preset for TypeScript
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
        '@babel/plugin-proposal-private-property-in-object',
      ],
    }),
  ],
};