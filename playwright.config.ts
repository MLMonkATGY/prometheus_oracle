import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
	use: {
		browserName: "chromium",
		headless: true,
		actionTimeout: 8000,
	},
	workers: process.env.CI ? 3 : undefined,
	reporter: [["list"], ["json", { outputFile: "reports.json" }]],
	timeout: 20000,
};
export default config;
