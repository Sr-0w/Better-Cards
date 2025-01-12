import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import serve from 'rollup-plugin-serve';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript(),
    json(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    terser(),
    ...(dev ? [
      serve({
        contentBase: ['dist'],
        host: '0.0.0.0',
        port: 5000,
        allowCrossOrigin: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }),
    ] : []),
  ],
  external: [
    'lit',
    'lit/decorators.js',
    'custom-card-helpers',
    'home-assistant-js-websocket',
    '@material/mwc-ripple',
    '@material/mwc-icon-button',
    'ha-entity-picker',
    'ha-icon-picker',
    'ha-textfield'
  ],
  onwarn(warning, warn) {
    // Skip certain warnings
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    // Use default for everything else
    warn(warning);
  }
};