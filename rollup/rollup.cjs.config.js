import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import pkg from '../package.json';

const name = 'index';

export default {
  input: pkg.source,
  output: {
    file: `dist/${[name, 'cjs', 'js'].join('.')}`,
    format: 'cjs',
    sourcemap: true,
  },
  external: ['react'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    sourcemaps(),
    terser({
      output: { comments: false },
      compress: {
        drop_console: true,
      },
    }),
  ],
};

