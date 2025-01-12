import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';

const dev = process.env.ROLLUP_WATCH;

const serveOpts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/better-cards.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-env', // For modern JS
        '@babel/preset-typescript', // If using TypeScript
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }], // Enable decorators
        ['@babel/plugin-transform-class-properties', { loose: true }], // Make sure 'loose' mode is true
        ['@babel/plugin-transform-private-methods', { loose: true }], // Same for private methods
        ['@babel/plugin-transform-private-property-in-object', { loose: true }], // And for private property accessors
      ],
    }),
    !dev && terser(),
    dev && serve(serveOpts),
  ].filter(Boolean),
};