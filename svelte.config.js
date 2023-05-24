// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from "mdsvex";
import slug from "rehype-slug";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({ 
			extensions: ['.md'],
			rehypePlugins: [slug]
		})
	]
};

export default config;
