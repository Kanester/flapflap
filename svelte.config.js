import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		paths: {
		  base: process.env.BUILD_TARGET === 'web' ? "/flapflap" : ""
		}
	}
};

export default config;
