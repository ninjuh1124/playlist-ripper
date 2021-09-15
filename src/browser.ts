import puppeteer, {
	Browser,
	BrowserLaunchArgumentOptions,
	ConnectOptions,
	HTTPRequest,
	LaunchOptions,
	Page,
} from 'puppeteer';

export const makeBrowser = async (
	options?: LaunchOptions & BrowserLaunchArgumentOptions & ConnectOptions
): Promise<Browser> => {
	const browser = await puppeteer.launch(options);
	return browser;
};

export const makePage = async (
	browser: Browser,
	url: string
): Promise<Page> => {
	const page = await browser.newPage();
	await page.setUserAgent(
		'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36'
	);
	await page.goto(url);
	return page;
};

export const scrapeRequests = async (
	page: Page,
	endpoint: RegExp = /\.m3u8$/
): Promise<HTTPRequest> => {
	await page.setRequestInterception(true);
	setTimeout(() => {
		page.reload();
	}, 2000);
	return new Promise((resolve, reject) => {
		page.on('request', (request) => {
			request.continue();
			if (endpoint.test(request.url())) {
				resolve(request);
			}
		});
	});
};
