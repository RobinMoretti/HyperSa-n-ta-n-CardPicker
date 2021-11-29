import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import dsv from '@rollup/plugin-dsv';
import babel from 'rollup-plugin-babel';

const { nodeResolve } = require('@rollup/plugin-node-resolve');
import commonjs from '@rollup/plugin-commonjs';
import dotenv from "rollup-plugin-dotenv";

export default {
	input: 'src/app.js',
	output: {
	  file: 'dist/app.js',
	  format: 'cjs'
	},
	plugins: [
		dotenv(),
		nodeResolve({ preferBuiltins: true, browser: true }),
		commonjs(),
		dsv(),
		// babel({
		//   exclude: 'node_modules/**',
		// }),
		scss({
			processor: () => postcss([autoprefixer()])
		}), // will output compiled styles to output.css
	]
  }

  