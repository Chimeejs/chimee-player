import base, { banner } from './rollup.config.base';
const { name } = require('../package.json');
import { camelize } from 'toxic-utils';
const config = base('umd');
export default Object.assign(config, {
  output: {
    format: 'umd',
    file: 'lib/chimee-player.browser.js',
    banner,
    name: camelize(name, true),
  },
});
