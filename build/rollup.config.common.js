import base, { banner } from './rollup.config.base';
export default Object.assign(base('common'), {
  output: {
    format: 'cjs',
    file: 'lib/chimee-player.js',
    banner,
  },
});
