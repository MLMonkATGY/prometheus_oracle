import { test, expect, Page } from "@playwright/test";
import { ServerResponse } from "http";
import ContentFormat from "../src/domain/ContentFormat.enum.js";
import { ConnectionManager } from "../src/repo/postgres/ConnectionManager.js";
import JobPostRaw from "../src/repo/table/JobPostRaw.js";
import fetch from 'node-fetch';
import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

const func1 = (allUrls:Array<string>)=>{
	const spec_url ="https://www.jobstreet.com.my/en/job/";

	let result = allUrls.filter(function (e){
		if(e.includes(spec_url)){
			return true
		}else{
			return false
		}
	});
	return result;
}
function randomIntFromInterval(min: number, max: number) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
  }

const fetchCode =async (url:string,page:Page) => {
	let response = await fetch(url);    
	if (response.status>= 500) {
		console.log(" ");
		setTimeout(async function(){
			await page.reload();

		},3000);

	}
}

const runTest = async (page :Page)=>{
	const next_btn_s="#jobList > div > div.sx2jih0.zcydq8bm.zcydq8p > div > a";
	await page.goto("https://www.jobstreet.com.my/en/job-search/computer-software-it-jobs-in-malaysia/1/");

		let rawNumbers = await page.locator("#pagination").innerText();
		let pageNumElem=rawNumbers.split('\n');
		// const lastPageNum = parseInt(pageNumElem[pageNumElem.length - 1])
		const lastPageNum = 1
		await getAllUrl(lastPageNum,page);

}

const getAllUrl=async(lastPageNum: number,page:Page)=>{

	for (let cont_page = 1; cont_page < lastPageNum + 1; cont_page++) {
		
		const allUrls = await page.$$eval("a", (elements) =>
		elements.map((el) => el.href)
			);
		const targetUrls = func1(allUrls);

		await getEachContent(targetUrls,page);
		
		const part1Url="https://www.jobstreet.com.my/en/job-search/computer-software-it-jobs-in-malaysia/";
		const part2Url = cont_page.toString();
		const finalUrl = part1Url.concat(part2Url);
		// await page.waitForTimeout(rndInt); 
		await page.goto(finalUrl).catch((err) => {
			console.log(err);
			fetchCode(finalUrl,page);
				
		});
		console.log(finalUrl);
	}
}

const getEachContent=async (targetUrls: string[],page:Page) => {

	for (let cat = 0; cat < targetUrls.length; cat++) {
		const em = await ConnectionManager(true);
		
		const rndInt=randomIntFromInterval(2000,4000);
		await page.waitForTimeout(rndInt); 
		const postUrl = targetUrls[cat];
		await page.goto(postUrl).catch((err) => {
			console.log(err);
			fetchCode(postUrl,page);
		
		});
		const content_l="#contentContainer";

		const version = 1;
		const portalUrl = "https://www.jobstreet.com.my";
		const rawContents = await page.locator(content_l).innerText();
		const rawContentType=ContentFormat.TEXT;
		const payload = new JobPostRaw(
			portalUrl,
			postUrl,
			version,
			rawContents,
			rawContentType
		);
		const recordNumBefore = await em.count(JobPostRaw, {});

		em.persist(payload);
		await em.flush();

		const recordNumAfter = await em.count(JobPostRaw, {});
		expect(recordNumAfter).toBe(recordNumBefore + 1);
		const inserted = await em.findOneOrFail(JobPostRaw, { id: payload.id });
		expect(inserted.portalUrl).toBe(portalUrl);

	}
}

test.only("basic test", async ({ page }) => {
	await runTest(page).catch(err=>{
		console.log(err)
	})

	
});


