#!/usr/bin/env node
import fs from 'fs';
import os from 'os';
import path from 'path';
import { Browser, Page } from 'puppeteer';
import { argv, url } from './argv.js';
import { makeBrowser, makePage, scrapeRequests } from './browser.js';

const rip = async () => {
	let browser: Browser;
	let args = ['youtube-dl'];
	try {
		browser = await makeBrowser({
			headless: !argv['show-browser'],
			defaultViewport: {
				width: 1920,
				height: 1080,
			},
			executablePath: argv['chrome-path'],
		});
	} catch (error) {
		process.exit(2);
	}

	let page: Page;
	try {
		page = await makePage(browser, url);

		const request = await scrapeRequests(
			page,
			argv.regex ? new RegExp(argv.regex) : undefined
		);

		if (argv['cookie-domain'].length) {
			const cookies: string = (
				await page._client.send('Network.getAllCookies')
			).cookies
				.filter((cookie: Cookie) =>
					argv['cookie-domain']
						.map((d) => String(d))
						.includes(cookie.domain)
				)
				.map((cookie: Cookie) => `${cookie.name}=${cookie.value}`)
				.join('; ');
			if (cookies.length) {
				args.push(`--add-header "Cookie:${cookies}"`);
			}
		}
		if (argv['quiet']) args.push('--quiet');
		args.push(request.url());
	} catch (error) {}

	browser.close();
	return args.join(' ');
};

process.stdout.write('', () => {
	rip().then((args: string) => {
		const argFile = path.join(os.tmpdir(), 'ytdl-cmd.sh');
		console.log(argFile);
		try {
			fs.rmSync(argFile);
		} catch (err) {}
		if (!argv['quiet']) console.log(args);
		fs.writeFileSync(argFile, args);
	});
});

interface Cookie {
	name: string;
	value: string;
	domain: string;
	path: string;
	expires: number;
	size: number;
	httpOnly: boolean;
	secure: boolean;
	session: boolean;
	sameSite: 'Strict' | 'Lax' | 'Extended' | 'None';
}
