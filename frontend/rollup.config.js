import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';
import { string } from 'rollup-plugin-string';
import json from '@rollup/plugin-json';
import { spawn } from 'child_process';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		dir: 'public/build',
		format: 'es',
		sourcemap: true,
		name: 'app',
		chunkFileNames: '[name]-[hash].js'
	},
	plugins: [
		// IMPORTANT: Process JSON files first with enhanced configuration
		json({
			// Make JSON imports work
			preferConst: true,
			// Generate a named export for every property
			namedExports: true,
			// Include compact output in production
			compact: production,
			// Explicitly include JSON files from the i18n directory
			include: ['src/i18n/locales/**/*.json'],
		}),
		
		// Plugin to handle markdown files as strings
		string({
			include: ['**/*.md']
		}),
		
		// Node resolution and CommonJS conversion need to happen BEFORE Svelte
		resolve({
			browser: true,
			dedupe: ['svelte'],
			// Ensure node_modules and JSON files are processed
			extensions: ['.mjs', '.js', '.json', '.svelte']
		}),
		
		commonjs(),
		
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		
		// Extract component CSS
		css({ output: 'bundle.css' }),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production, minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
