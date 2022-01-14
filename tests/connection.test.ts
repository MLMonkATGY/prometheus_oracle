import { test, expect } from "@playwright/test";
import { ConnectionManager } from "../src/repo/postgres/ConnectionManager.js";
import Book from "../src/repo/table/Book.js";
// test("test connection ", async ({ page }) => {
// 	const conn = await ConnectionManager();
// 	expect(conn).toBeDefined();
// });

test("test add find delete ", async ({ page }) => {
	const em = await ConnectionManager(true);
	const title = "aaa";
	const a2 = 4;
	const payload = new Book(title, a2);
	em.persist(payload);
	await em.flush();
	const inserted = await em.findOne(Book, { title: title });
	const recordNum = await em.count(Book, {});
	expect(inserted).toBeDefined();
	expect(inserted!.title).toBe(title);
	expect(inserted!.author2).toBe(a2);
	em.remove(inserted!);
	await em.flush();
	const recordNumAfterDelete = await em.count(Book, {});
	expect(recordNumAfterDelete).toBe(recordNum - 1);
});
