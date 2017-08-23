const {version, name, author, license, dependencies} = require('../package.json');
const banner = `
/** ${camelize(name)}
 * ${name} v${version}
 * (c) 2017 ${author}
 * Released under ${license}
 */
`;
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
// PostCSS plugins
import nested from 'postcss-nested';
import cssnano from 'cssnano';

const babelConfig = {
  cjs: {
    presets: [
      ['latest', {es2015: {modules: false}}]
    ],
    plugins: ['transform-runtime'],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false
  },
  es: {
    presets: [
      ['latest', {es2015: {modules: false}}]
    ],
    plugins: ['transform-runtime'],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false
  },
  umd: {
    presets: ['es2015-rollup'],
    plugins: ['transform-runtime'],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false
  },
  iife: {
    presets: ['es2015-rollup'],
    plugins: [],
    babelrc: false
  },
  min: {
    presets: ['es2015-rollup'],
    exclude: 'node_modules/**',
    plugins: [],
    babelrc: false
  }
};
const externalRegExp = new RegExp(Object.keys(dependencies).join('|'));
export default function (modeConf) {
  const mode = modeConf.output.format;
  const config = {
    input: 'src/index.js',
    banner,
    external (id) {
      return !/min|umd|iife/.test(mode) && externalRegExp.test(id);
    },
    plugins: [
      postcss({
        plugins: [
          nested(),
          cssnano()
        ],
        extensions: ['.css']
      }),
      babel(babelConfig[mode]),
      resolve(),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  };
  modeConf.uglify && config.plugins.push(uglify());
  delete modeConf.uglify;
  Object.assign(config, modeConf);
  if(mode === 'umd') {
    config.name = camelize(name);
  }
  return config;
};

/**
 * camelize any string, e.g hello world -> helloWorld
 * @param  {string} str only accept string!
 * @return {string}     camelize string
 */
function camelize (str) {
  return str.replace(/(^|[^a-zA-Z]+)([a-zA-Z])/g, function (match, spilt, initials, index) {
    return initials.toUpperCase();
  });
}
