import theme from '@jsilva-pt/nuxt-content-theme-blog';
import { footerLinks } from './blog.settings';

const baseUrl = 'https://sanjaysanjel019.github.io';

const publicRuntimeConfig = {
	baseUrl: 'https://sanjaysanjel019.github.io',

	// logoLight: '/logo-light.svg',
	logoLight: '/logo-dark.svg',
	logoDark: '/logo-dark.svg',
	// logoLight: '/icon.png',
	// logoDark: '/icon.png',

	githubOwner: 'sanjaysanjel019',
	githubRepository: 'nuxtjs-demo-blog',
	githubMainBranch: 'master',

	footerLinks
};

export default theme({
	feedOptions: {
		title: 'Sanjay Sanjel Blog',
		description: 'Web | Security | InfoSec',
		link: baseUrl
	},
	publicRuntimeConfig,
	pwa: {
		manifest: {
			short_name: 'Sanjay Sanjel Blog'
		},
		meta: {
			author: 'Sanjay Sanjel',
			theme_color: '#2C3E50',
			ogHost: baseUrl,
			twitterCard: 'summary_large_image',
			twitterSite: publicRuntimeConfig.twitterUsername,
			twitterCreator: publicRuntimeConfig.twitterUsername
		}
	},
	i18n: {
		locales: [
			{
				code: 'en',
				iso: 'en-US',
				name: 'English'
			}
		],
		defaultLocale: 'en',
		vueI18n: {
			fallbackLocale: 'en',
			messages: {
				en: require('./i18n/en-US')
			}
		}
	}
});
