import { test, expect } from "@playwright/test";
import { Scheduler } from "../src/domain/scheduler/scheduler.js";
import { logger } from "../src/domain/scheduler/Logger.js";
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
test("test launch worker from scheduler", async ({ page }) => {
	new Scheduler();
	logger.info("start Ut");

	await wait(10000);
	logger.warn("Done Ut");

	// scheduler.startWorker();
});
test("test failed test", async ({ page }) => {
	logger.error("This is inteded to fail");
	throw new Error("Error as intended");

	// scheduler.startWorker();
});
