#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
	.options({
		'show-browser': {
			alias: 'b',
			default: false,
			desc: 'Launches browser in non-headless mode',
			boolean: true,
		},
		'chrome-path': {
			alias: 'c',
			desc: 'Specifies alternate browser path',
			default: undefined,
		},
		'regex': {
			alias: 'r',
			desc: 'Specify regex to match m3u/m3u8 url',
			default: '\\.m3u8',
		},
	})
	.parseSync();

const url = argv._.map((a) => a.toString())[0];

if (!url) {
	console.warn('Must supply stream URL: `npm run rip <options> [url]`');
	process.exit(1);
}

export { argv, url };
