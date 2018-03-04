const { version, name, author, license, dependencies } = require('../package.json');
import { camelize } from 'toxic-utils';
export const banner = `
/** ${camelize(name)}
 * ${name} v${version}
 * (c) 2017-${(new Date().getFullYear())} ${author}
 * Released under ${license}
 */
`;
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import visualizer from 'rollup-plugin-visualizer';
// PostCSS plugins
import nested from 'postcss-nested';
import cssnano from 'cssnano';

const babelConfig = {
  common: {
    presets: [
      [ 'env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
      'stage-0',
    ],
    exclude: 'node_modules/**',
    plugins: [
      'external-helpers',
      'transform-runtime',
    ],
    externalHelpers: true,
    runtimeHelpers: true,
    babelrc: false,
  },
  es: {
    presets: [
      [ 'env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
      'stage-0',
    ],
    exclude: 'node_modules/**',
    plugins: [
      'external-helpers',
      'transform-runtime',
    ],
    externalHelpers: true,
    runtimeHelpers: true,
    babelrc: false,
  },
  umd: {
    presets: [
      [ 'env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
      'stage-0',
    ],
    exclude: 'node_modules/**',
    plugins: [
      'external-helpers',
      'transform-runtime',
    ],
    externalHelpers: true,
    runtimeHelpers: true,
    babelrc: false,
  },
  iife: {
    presets: [
      [ 'env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
      'stage-0',
    ],
    exclude: 'node_modules/**',
    plugins: [
      'external-helpers',
      'transform-runtime',
    ],
    externalHelpers: true,
    runtimeHelpers: true,
    babelrc: false,
  },
  min: {
    presets: [
      [ 'env', {
        modules: false,
        targets: {
          browsers: [ 'last 2 versions', 'not ie <= 8' ],
        },
      }],
      'stage-0',
    ],
    exclude: 'node_modules/**',
    plugins: [
      'external-helpers',
    ],
    runtimeHelpers: true,
    babelrc: false,
  },
};
const externalRegExp = new RegExp(Object.keys(dependencies).join('|'));
export default function(mode) {
  const config = {
    input: 'src/index.js',
    external(id) {
      return !/min|umd|iife/.test(mode) && externalRegExp.test(id) && !/\.css$/.test(id);
    },
    plugins: [
      postcss({
        plugins: [
          nested(),
          cssnano(),
        ],
        extensions: [ '.css' ],
      }),
      babel(babelConfig[mode]),
      resolve(),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      visualizer({
        filename: `bundle-size/${mode}.html`,
      }),
    ],
  };
  return config;
}
