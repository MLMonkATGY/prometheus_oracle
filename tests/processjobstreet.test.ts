import { test, expect, Page } from "@playwright/test";
import { ServerResponse } from "http";
import ContentFormat from "../src/domain/ContentFormat.enum.js";
import { ConnectionManager } from "../src/repo/postgres/ConnectionManager.js";
import JobPostRaw from "../src/repo/table/JobPostRaw.js";
import fetch from 'node-fetch';
import { stringify } from "querystring";
import JobStreetTable from "../src/repo/table/JobStreetTable.js"; 
import { Connection, IDatabaseDriver, MikroORM, QueryOrder } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import {getAllFromJobPostRow} from "../src/service/jobstreet/JobStreetExtraction.js"
//

test("process job street", async ({ page }) => {
	let em = await ConnectionManager(true);
	const recordNumBefore = await em.count(JobStreetTable, {});

	await getAllFromJobPostRow(2000)

	const recordNumAfter = await em.count(JobStreetTable, {});
	expect(recordNumAfter).toBeGreaterThan(recordNumBefore);

	const inserted = await em.find(JobStreetTable, {},{limit:1})
	expect(inserted[0]).not.toBeNull()
	


})