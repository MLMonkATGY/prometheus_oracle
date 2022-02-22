import { test, expect, Page } from "@playwright/test";
import { ServerResponse } from "http";
import ContentFormat from "../src/domain/ContentFormat.enum.js";
import { ConnectionManager } from "../src/repo/postgres/ConnectionManager.js";
import JobPostRaw from "../src/repo/table/JobPostRaw.js";
import fetch from 'node-fetch';
import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

function demo(){
	// 	// const contents = rawContents.split('\n');
// 	// let mp =new Map();

// 	//contents into category
// 	// for (let index = 0; index < contents.length; index++) {
// 	// 	mp.set("jobName",contents[0]);
// 	// 	mp.set("company",contents[1]);
// 	// 	mp.set("location",contents[2]);
	
// 	// 	if (contents[index].includes("MYR")) {
// 	// 		mp.set("salary",contents[index]);
// 	// 	}
// 	// 	else if (contents[index].includes("Posted"||"Posted on")) {
// 	// 		mp.set("postTime",contents[index]);
// 	// 	}
// 	// 	else if (contents[index].includes("Career Level")) {
// 	// 		mp.set("careerLevel",contents[index+1]);
// 	// 	}
// 	// 	else if (contents[index].includes("Qualification")) {
// 	// 		mp.set("qualification",contents[index+1]);
// 	// 	}
// 	// 	else if (contents[index].includes("Years of Experience")) {
// 	// 		mp.set("yearOfExperience",contents[index+1]);
// 	// 	}
// 	// 	else if (contents[index].includes("Job Type")) {
// 	// 		mp.set("jobType",contents[index+1]);
// 	// 	}
// 	// 	else if (contents[index].includes("Job Specializations")) {
// 	// 		mp.set("jobSpecializations",contents[index+1]);
// 	// 	}
// 	// 	else if (contents[index].includes("Company Overview")) {
// 	// 		mp.set("companyOverview",contents[index]);
// 	// 	}
// 	// 	else if (contents[index].includes("Company Size")) {
// 	// 		mp.set("companySize",contents[index+1]);
// 	// 	}
// 	// 	else if (contents[index].includes("Average Processing Time")) {
// 	// 		mp.set("averageProcessingTime",contents[index+1]);
// 	// 	}
// 	// 	else if (contents[index].includes("Industry")) {
// 	// 		mp.set("industry",contents[index+1]);
// 	// 	}
// 	// 	else if (contents[index].includes("Benefits & Others")) {
// 	// 		mp.set("benefits",contents[index+1]);
// 	// 	}

// 	// 	//TODO Company Overview, Job Description
	
// 	// }
}
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
		const lastPageNum = 3
		// getAllUrl(lastPageNum,page);

		for (let cont_page = 2; cont_page < lastPageNum + 1; cont_page++) {
		
			const allUrls = await page.$$eval("a", (elements) =>
			elements.map((el) => el.href)
				);
			const targetUrls = func1(allUrls);
	
			// getEachContent(targetUrls,page);
			for (let cat = 0; cat < targetUrls.length; cat++) {
				const em = await ConnectionManager(true);
				const recordNumBefore = await em.count(JobPostRaw, {});

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
				em.persist(payload);
				await em.flush();
		
				const recordNumAfter = await em.count(JobPostRaw, {});
				expect(recordNumAfter).toBe(recordNumBefore + 1);
				const inserted = await em.findOneOrFail(JobPostRaw, { id: payload.id });
				expect(inserted.portalUrl).toBe(portalUrl);
		
			}
			
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

const getAllUrl=async(lastPageNum: number,page:Page)=>{

	for (let cont_page = 2; cont_page < lastPageNum + 1; cont_page++) {
		
		const allUrls = await page.$$eval("a", (elements) =>
		elements.map((el) => el.href)
			);
		const targetUrls = func1(allUrls);

		getEachContent(targetUrls,page);
		
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
		em.persist(payload);
		await em.flush();

		const recordNumBefore = await em.count(JobPostRaw, {});
		const recordNumAfter = await em.count(JobPostRaw, {});
		expect(recordNumAfter).toBe(recordNumBefore + 1);
		const inserted = await em.findOneOrFail(JobPostRaw, { id: payload.id });
		expect(inserted.portalUrl).toBe(portalUrl);

	}
}

test("basic test", async ({ page }) => {
	await runTest(page).catch(err=>{
		console.log(err)
	})

	
});


