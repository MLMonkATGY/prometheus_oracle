import { test, expect } from "@playwright/test";
const func1 = (allUrls:Array<string>)=>{
	const spec_url ="https://www.jobstreet.com.my/en/job/";
	// const result = allUrls.filter(spec_url);

	let result = allUrls.filter(function (e){
		if(e.includes(spec_url)){
			return true
		}else{
			return false
		}
	});
	return result;
}

test.only("basic test", async ({ page }) => {

	const part1Url="https://www.jobstreet.com.my/en/job-search/computer-software-it-jobs-in-malaysia/";
	const next_btn_s="#jobList > div > div.sx2jih0.zcydq8bm.zcydq8p > div > a";
	
	await page.goto("https://www.jobstreet.com.my/en/job-search/computer-software-it-jobs-in-malaysia/1/");
		// totol pages
		let rawNumbers = await page.locator("#pagination").innerText();
		let biggest=rawNumbers.split('\n');

	for (let cont_page = 1; cont_page < biggest.length+1; cont_page++) {
		

		const allUrls = await page.$$eval("a", (elements) =>
		elements.map((el) => el.href)
			);
		const targetUrls = func1(allUrls);
			
			for (let cat = 0; cat < targetUrls.length; cat++) {
				
				await page.waitForTimeout(1000); 
				const exampleUrl = targetUrls[cat];
				await page.goto(exampleUrl);
	
				const content_l="#contentContainer";
				const rawContents = await page.locator(content_l).innerText();
				const contents = rawContents.split('\n');
				let mp =new Map();

				//contents into category
				for (let index = 0; index < contents.length; index++) {
					mp.set("jobName",contents[0]);
					mp.set("company",contents[1]);
					mp.set("location",contents[2]);
					
					if (contents[index].includes("MYR")) {
						mp.set("salary",contents[index]);
					}
					else if (contents[index].includes("Posted"||"Posted on")) {
						mp.set("postTime",contents[index]);
					}
					else if (contents[index].includes("Career Level")) {
						mp.set("careerLevel",contents[index+1]);
					}
					else if (contents[index].includes("Qualification")) {
						mp.set("qualification",contents[index+1]);
					}
					else if (contents[index].includes("Years of Experience")) {
						mp.set("yearOfExperience",contents[index+1]);
					}
					else if (contents[index].includes("Job Type")) {
						mp.set("jobType",contents[index+1]);
					}
					else if (contents[index].includes("Job Specializations")) {
						mp.set("jobSpecializations",contents[index+1]);
					}
					else if (contents[index].includes("Company Overview")) {
						mp.set("companyOverview",contents[index]);
					}
					else if (contents[index].includes("Company Size")) {
						mp.set("companySize",contents[index+1]);
					}
					else if (contents[index].includes("Average Processing Time")) {
						mp.set("averageProcessingTime",contents[index+1]);
					}
					else if (contents[index].includes("Industry")) {
						mp.set("industry",contents[index+1]);
					}
					else if (contents[index].includes("Benefits & Others")) {
						mp.set("benefits",contents[index+1]);
					}
	
					//TODO Company Overview, Job Description
					
				}
	
			}
		
			const part2Url = biggest[cont_page];
			const finalUrl = part1Url.concat(part2Url);
			await page.goto(finalUrl);
			console.log(finalUrl);

	}
});
