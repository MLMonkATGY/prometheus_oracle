import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
	use: {
		browserName: "chromium",
		headless: true,
	},
	workers: process.env.CI ? 2 : 3,
	reporter: [["list"], ["json", { outputFile: "reports.json" }]],
};
export default config;
