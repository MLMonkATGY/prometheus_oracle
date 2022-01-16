import { devices as pDevices } from "@playwright/test";
import {
	BrowserContext,
	BrowserType,
	chromium,
	firefox,
	webkit,
	Browser,
} from "playwright";
export enum SupportedBrowserType {
	Chromium = 1,
	Firefox = 2,
	WebKit = 3,
}

export class BrowserWorker {
	public browserInstance: Browser;
	private browserType: SupportedBrowserType;
	constructor(browserType: SupportedBrowserType, browserInstance: Browser) {
		this.browserType = browserType;
		this.browserInstance = browserInstance;
	}
	public static async build(browserType: SupportedBrowserType) {
		let browser: Browser | null = null;
		const launchSettings = { headless: false };
		switch (browserType) {
			case SupportedBrowserType.Chromium:
				browser = await chromium.launch(launchSettings);
				break;
			case SupportedBrowserType.Firefox:
				browser = await firefox.launch(launchSettings);
				break;
			case SupportedBrowserType.WebKit:
				browser = await webkit.launch(launchSettings);
				break;
			default:
				browser = await chromium.launch(launchSettings);
				break;
		}
		return new BrowserWorker(browserType, browser);
	}
}
export class BrowserContextWorker {
	private device: typeof pDevices["Desktop Chrome"];
	private browserContext: BrowserContext;
	constructor(
		browserContext: BrowserContext,
		device: typeof pDevices["Desktop Chrome"] = pDevices["Desktop Chrome"]
	) {
		this.device = device;

		this.browserContext = browserContext;
	}
	public async launchPage() {
		const page = await this.browserContext.newPage();
		await page.goto("https://example.com");
		await page.waitForTimeout(3000);
		await page.close();
		return;
	}
	public static async build(
		browserWorker: BrowserWorker,
		device: typeof pDevices["Desktop Chrome"] = pDevices["Desktop Chrome"]
	) {
		const browserContext = await browserWorker.browserInstance.newContext();
		return new BrowserContextWorker(browserContext, device);
	}
}
