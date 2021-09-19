#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
	.options({
		'show-browser': {
			alias: 'h',
			default: false,
			desc: 'Launches browser in non-headless mode',
			boolean: true,
			group: 'puppeteer',
		},
		'chrome-path': {
			alias: 'p',
			desc: 'Specifies alternate browser path',
			default: undefined,
			group: 'puppeteer',
		},
		'regex': {
			alias: 'r',
			desc: 'Specify regex to match m3u/m3u8 url',
			default: '\\.m3u8',
			group: 'puppeteer',
		},
		'cookie-domain': {
			alias: 'd',
			default: [],
			desc: 'Domain for cookies',
			array: true,
			type: 'string',
			group: 'puppeteer',
		},
		'simulate': {
			alias: 's',
			default: false,
			desc: "Pass --simulate to youtube-dl (don't actually download)",
			boolean: true,
			group: 'output',
		},
		'output': {
			alias: 'o',
			default: '',
			desc: 'Output filename',
			group: 'output',
		},
		'quiet': {
			alias: 'q',
			default: false,
			boolean: true,
			desc: 'Hide all console output, and pass --quiet to youtube-dl',
			group: 'output',
		},
		'verbose': {
			alias: 'v',
			default: false,
			boolean: true,
			group: 'output',
		},
	})
	.parseSync();

const url = argv._.map((a) => a.toString())[0];

if (!url) {
	console.warn('Must supply stream URL: `npm run rip <options> [url]`');
	process.exit(1);
}

export { argv, url };
