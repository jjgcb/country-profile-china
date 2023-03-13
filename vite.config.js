import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path'

const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$carbon: path.resolve('./src/components/Carbon'),
			$components: path.resolve('./src/components'),
			$copy: path.resolve('./src/copy'),
			$article: path.resolve('./src/article.json')
		}
	}
};

export default config;
