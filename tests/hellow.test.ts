import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
	await page.goto("https://www.google.com/ddd");
	await page.waitForTimeout(1000);
	expect(1).toBe(1);
});
