import puppeteer, { Browser, HTTPRequest, Page } from 'puppeteer-core';
export declare const makeBrowser: (options?: (puppeteer.LaunchOptions & puppeteer.BrowserLaunchArgumentOptions & puppeteer.ConnectOptions) | undefined) => Promise<Browser>;
export declare const makePage: (browser: Browser, url: string) => Promise<Page>;
export declare const scrapeRequests: (page: Page, endpoint?: RegExp) => Promise<HTTPRequest>;
//# sourceMappingURL=browser.d.ts.map