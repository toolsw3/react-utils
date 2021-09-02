import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from '@rollup/plugin-typescript';
import pkg from '../package.json';

const name = 'index';

export default {
  input: pkg.source,
  output: {
    file: `dist/${[name, 'esm', 'js'].join('.')}`,
    format: 'esm',
    sourcemap: true,
  },
  external: ['react'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    sourcemaps(),
  ],
};

