import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/app-index.ts',
  output: {
    dir: 'build',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve({
      exportConditions: ['development'],
    }),
    typescript({
      tsconfig: 'tsconfig.dev.json',
    }),
    replace({
      'preventAssignment': true,
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'production'
      ),
    }),
    copy({
      targets: [
        { src: 'assets/', dest: 'build/' },
        { src: 'styles/global.css', dest: 'build/styles/' },
        { src: 'styles/squirminal.css', dest: 'build/styles/' },
        { src: 'manifest.json', dest: 'build/' },
      ],
      copyOnce: true,
    }),
  ],
};
