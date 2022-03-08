import { test, expect, Page } from "@playwright/test";
import { ServerResponse } from "http";
import ContentFormat from "../src/domain/ContentFormat.enum.js";
import { ConnectionManager } from "../src/repo/postgres/ConnectionManager.js";
import JobPostRaw from "../src/repo/table/JobPostRaw.js";
import fetch from 'node-fetch';
import { stringify } from "querystring";
import JobStreetTable from "../src/repo/table/JobStreetTable.js"; 
import { QueryOrder } from "@mikro-orm/core";
import { url } from "inspector";


// const getPostedTime=(time:string)=>{
// 	const condition='on'
// 	if(time.includes(condition)){
// 		let postedTime=time.split('Posted on ')
// 		return postedTime[1]
// 	}else{
// 		return "asd"
// 	}

// }

test.only("process job street", async ({ page }) => {
	await getAllFromJobPostRow()

	// const ptime=getPostedTime("Posted on 11-Feb-22")
	
// console.log(cont)
});


const getAllFromJobPostRow=async()=>{
	const em = await ConnectionManager(true);
	const getFromJobPostRow=em.getRepository(JobPostRaw)
	const getAll = await em.find(JobPostRaw, {},{limit:1000})

	for (let index = 0; index < getAll.length; index++) {
		const raw = getAll[index];
		const getRawContent=raw.rawContent
		const contents = getRawContent.split('\n');

		let temp_jobName: string = "";
		let temp_companyName: string = ""
		let temp_location: string=""
		let temp_salary :string = ""
		let temp_postedTime: Date  = new Date();
		let temp_careerLevel: string = ""
		let temp_qualification: string = ""
		let temp_yearofExperience: number = -1
		let temp_jobType: string = ""
		let temp_jobSpec: string = ""
		let temp_compOver: string[] = [""]
		let temp_compSize: string = ""
		let temp_averProcTime: number = -1
		let temp_inds: string = ""
		let temp_benef: string = ""
		let temp_jobDes: string[] = [""]

		let locationJobHigts:number=-1
		let locationAdtnInfo:number=-1
		let locationCmpOvr:number=-1
		let locationAddiCompyInfo:number=-1

		for (let cat = 0; cat < contents.length; cat++) {
			temp_jobName=contents[0]
			temp_companyName=contents[1]
			temp_location=contents[2]

			if(contents[cat].includes("MYR")){
				temp_salary=contents[cat]
			}
			//// Get Job Description
			else if(contents[cat].includes("Job Highlights")){
				locationJobHigts = cat
			}
			else if(contents[cat].includes("Additional Information")){
				locationAdtnInfo = cat
			}
			else if(locationJobHigts != -1 && locationAdtnInfo != -1 ){
				temp_jobDes = contents.slice(locationJobHigts,locationAdtnInfo)
				locationJobHigts = -1
				locationAdtnInfo = -1
			}
			////
			////Get Company Overview
			else if(contents[cat].includes("Company Overview")){
				locationCmpOvr=cat
			}
			else if(contents[cat].includes("Additional Company Information")){
				locationAddiCompyInfo=cat
			}
			else if(locationCmpOvr != -1 && locationAddiCompyInfo != -1 ){
				temp_compOver=contents.slice(locationCmpOvr,locationAddiCompyInfo)
				locationCmpOvr= -1
				locationAddiCompyInfo = -1
			}
			////
			else if(contents[cat].includes("Posted on")||contents[cat].includes("ago")){
				// temp_postedTime=contents[cat]
				// const numELem = parseInt(contents[cat].split(" ")[0])
			}
			else if(contents[cat].includes("Career Level")){
				temp_careerLevel=contents[cat+1]
			}
			else if(contents[cat].includes("Qualification")){
				temp_qualification=contents[cat+1]
			}
			else if(contents[cat].includes("Years of Experience")){
				temp_yearofExperience=processYearOfExperience(contents[cat+1])
			}
			else if(contents[cat].includes("Job Type")){
				temp_jobType=contents[cat+1]
			}
			else if(contents[cat].includes("Job Specializations")){
				temp_jobSpec=contents[cat+1]
			}
			else if(contents[cat].includes("Company Size")){
				temp_compSize=contents[cat+1]
			}
			else if(contents[cat].includes("Average Processing Time")){
				temp_averProcTime=processAvrProcessingTime(contents[cat+1])
			}
			else if(contents[cat].includes("Industry")){
				temp_inds=contents[cat+1]
			}
			else if(contents[cat].includes("Benefits & Others")){
				temp_benef=contents[cat+1]
			}
			
			
		}


		const jobStreetElement = new JobStreetTable(
			temp_jobName,
			temp_companyName,
			temp_compOver,
			temp_compSize,
			temp_location,
			temp_benef,
			temp_averProcTime,
			temp_inds,
			temp_jobDes,
			temp_careerLevel,
			temp_qualification,
			temp_yearofExperience,
			temp_jobType,
			temp_jobSpec,
			temp_salary,
			raw.postUrl,
			raw.version,
			temp_postedTime,);
		
		await em.persistAndFlush(jobStreetElement)
			
		console.log()
		
	}
}

const processYearOfExperience = (yoExperience:string) => {
	const result = parseInt(yoExperience)
	return result
}

const processAvrProcessingTime = (avrPrcsTime:string) => {
	const result = parseInt(avrPrcsTime)
	return result
}

