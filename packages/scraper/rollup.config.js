import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import run from '@rollup/plugin-run';
import pkg from './package.json';
import { builtinModules } from 'module';

const deps = (d) => (d ? Object.keys(d) : []);

const watch = process.env.ROLLUP_WATCH;

/** @type {import('rollup').RollupOptions} */
const baseConfig = {
  input: 'src/index.ts',
  external: [
    ...builtinModules,
    ...deps(pkg.dependencies),
    ...deps(pkg.devDependencies)
  ]
};

/** @type {import('rollup').RollupOptions[]} */
const config = [
  {
    ...baseConfig,
    plugins: [esbuild(), watch ? run() : null],
    output: { file: 'dist/index.mjs', format: 'esm' }
  }
];

if (!watch) {
  config.push({
    ...baseConfig,
    plugins: [dts()],
    output: {
      file: 'dist/types/index.d.ts',
      format: 'esm'
    }
  });
}

export default config;
