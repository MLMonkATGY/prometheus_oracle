import { test, expect, Page } from "@playwright/test";
import { ServerResponse } from "http";
import ContentFormat from "../src/domain/ContentFormat.enum.js";
import { ConnectionManager } from "../src/repo/postgres/ConnectionManager.js";
import JobPostRaw from "../src/repo/table/JobPostRaw.js";
import fetch from 'node-fetch';
import { stringify } from "querystring";

interface Content{
	jobName:string
	company:string
	location:string
	salary?:string
	postTime:string
	careerLevel?:string
	qualification:string
	yearOfExperience?:string
	jobType:string
	jobSpecializations:string
	companyOverview:string
	companySize:string
	averageProcessingTime?:string
	industry:string
	benefits:string
	jobDescription:string
	url:string
	version: number
	postedTime:string
}

const contentCat=(content:Content)=>{
	let defaultContent={
		jobName:"",
		company:"",
		location:"",
		salary:"",
		postTime:"",
		careerLevel:"",
		qualification:"",
		yearOfExperience:"",
		jobType:"",
		jobSpecializations:"",
		companyOverview:" ",
		companySize:" ",
		averageProcessingTime:" ",
		industry:"",
		benefits:"",
		jobDescription:"",
		url:"",
		version: 1,
		postedTime:"",
	}
	if(content.postedTime){
		defaultContent.postedTime=content.postedTime
	}
	return defaultContent
}

const getPostedTime=(time:string)=>{
	const condition='on'
	if(time.includes(condition)){
		let postedTime=time.split('Posted on ')
		return postedTime[1]
	}else{
		return "asd"
	}

}

test.only("process job street", async ({ page }) => {
	getAllFromJobPostRow()

	// const ptime=getPostedTime("Posted on 11-Feb-22")
// 	const temp = contentCat({
// 	url: "",
// 	jobName: "",
// 	company: "",
// 	location: "",
// 	postTime: "",
// 	qualification: "",
// 	jobType: "",
// 	jobSpecializations: "",
// 	companyOverview: "",
// 	companySize: "",
// 	industry: "",
// 	benefits: "",
// 	jobDescription: "",
// 	version: 1,
// 	postedTime: ptime
// })
// console.log(temp)
});

const getAllFromJobPostRow=async()=>{
	const em = await ConnectionManager(true);
	const getAll=await em.find(JobPostRaw,{})

	for (let index = 0; index < getAll.length; index++) {
		const raw = getAll[index];
		const getRawContent=raw.rawContent
		const contents = getRawContent.split('\n');
		
		for (let cat = 0; cat < contents.length; cat++) {
			const element = contents[cat];
			
		}
		
	}
}
