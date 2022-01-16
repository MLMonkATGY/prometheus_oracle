import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
	await page.goto("https://www.google.com/");
	await page.waitForTimeout(5000);
	expect(1).toBe(1);
});
