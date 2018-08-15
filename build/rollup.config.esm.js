import base, { banner } from './rollup.config.base';
const config = base('esm');
export default Object.assign(config, {
  output: {
    format: 'es',
    file: 'lib/chimee-player.esm.js',
    banner,
  },
});
