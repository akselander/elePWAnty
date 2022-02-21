import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import strip from '@rollup/plugin-strip';
import copy from 'rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';

export default {
  input: [
    'src/app-index.ts',
    'service-worker.ts',
    'node_modules/lit/experimental-hydrate-support.js',
    'node_modules/@webcomponents/template-shadowroot/template-shadowroot.js',
  ],
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: false,
  },
  plugins: [
    resolve({
      exportConditions: ['production'],
    }),
    replace({
      'preventAssignment': true,
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'production'
      ),
    }),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    terser(),
    strip({
      functions: ['console.log'],
    }),
    copy({
      targets: [
        { src: 'assets/', dest: 'dist/' },
        { src: 'styles/global.css', dest: 'dist/styles/' },
        { src: 'styles/squirminal.css', dest: 'dist/styles/' },
        { src: 'manifest.json', dest: 'dist/' },
      ],
    }),
  ],
  preserveEntrySignatures: 'strict',
};
