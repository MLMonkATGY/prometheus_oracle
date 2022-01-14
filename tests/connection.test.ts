import { test, expect } from "@playwright/test";
import { ConnectionManager } from "../src/repo/postgres/ConnectionManager.js";
test("test connection ", async ({ page }) => {
	const conn = await ConnectionManager();
	expect(conn).toBeDefined();
});
