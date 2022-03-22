import { test, expect,Page } from "@playwright/test";
import { ServerResponse } from "http";
import ContentFormat from "../..//domain/ContentFormat.enum.js";
import { ConnectionManager } from "../../repo/postgres/ConnectionManager.js";
import JobPostRaw from "../../repo/table/JobPostRaw.js";
import fetch from 'node-fetch';
export class JobStreetCrawler{

    public scrape=async(page:Page)=>{
        async function fetchCode(url:string) { 

            let response = await fetch(url);    
            if (response.status>= 500) {
                console.log(" ");
                setTimeout(async function(){
                    await page.reload();
        
                },3000);
        
            }
            
        }
        const em = await ConnectionManager(true);
	const part1Url="https://www.jobstreet.com.my/en/job-search/computer-software-it-jobs-in-malaysia/";
	const next_btn_s="#jobList > div > div.sx2jih0.zcydq8bm.zcydq8p > div > a";
	
	await page.goto("https://www.jobstreet.com.my/en/job-search/computer-software-it-jobs-in-malaysia/1/");
		// totol pages
		let rawNumbers = await page.locator("#pagination").innerText();
		let pageNumElem=rawNumbers.split('\n');
		const lastPageNum = parseInt(pageNumElem[pageNumElem.length - 1])
		// const lastPageNum = 3
	for (let cont_page = 2; cont_page < lastPageNum + 1; cont_page++) {
		

		const allUrls = await page.$$eval("a", (elements: any[]) =>
		elements.map((el) => el.href)
			);
		const targetUrls= this.func1(allUrls);
		const rndInt=JobStreetCrawler.randomIntFromInterval(1000,3000);

			for (let cat = 0; cat < targetUrls.length; cat++) {
				
				await page.waitForTimeout(rndInt); 
				const postUrl = targetUrls[cat];
				await page.goto(postUrl).catch((err: any) => {
					console.log(err);
					//check status code
					fetchCode(postUrl);
				
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
			}
				const part2Url = cont_page.toString();
				const finalUrl = part1Url.concat(part2Url);
				await page.waitForTimeout(rndInt); 
				await page.goto(finalUrl).catch((err: any) => {
					console.log(err);
					//check status code
					fetchCode(finalUrl);
				
				});
				console.log(finalUrl);
    }


}

public func1 = (allUrls:Array<string>)=>{
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
public static randomIntFromInterval(min: number, max: number) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}}
// const a = new JobStreetCrawler()
// await a.scrape().catch(err=>{})