import { test, expect } from "@playwright/test";
import { Scheduler } from "../src/domain/scheduler/scheduler.js";
import { logger } from "../src/domain/Logger.js";
// test("test resolve worker fp", async ({ page }) => {
// 	const scheduler = new Scheduler();
// 	const rawFp = Scheduler.resolveWorkerFilePath();

// 	let re2 = new RegExp("./out/.*/*.js", "i");

// 	expect(rawFp).toMatch(re2);

// 	console.log(rawFp);
// });
const wait = (ms: number) => {
	return new Promise((resolve, rej) => {
		setTimeout(() => {
			resolve(true);
		}, ms);
	});
};
test.only("wobb page traversal", async ({ page }) => {
	const baseUrl = "https://my.hiredly.com/"
    await page.goto(baseUrl);
    await wait(5000);

	// scheduler.startWorker();
});
