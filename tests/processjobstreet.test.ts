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
		careerLevel:"",
		qualification:"",
		yearOfExperience:"",
		jobType:"",
		jobSpecializations:"",
		companyOverview:"",
		companySize:"",
		averageProcessingTime:"",
		industry:"",
		benefits:"",
		jobDescription:"",
		url:"",
		version: 1,
		postedTime:"",
	}
	if(content.jobName){
		defaultContent.jobName=content.jobName
	}
	if(content.company){
		defaultContent.company=content.company
	}
	 if(content.location){
		defaultContent.location=content.location
	}
	 if(content.salary){
		defaultContent.salary=content.salary
	}
	 if(content.careerLevel){
		defaultContent.careerLevel=content.careerLevel
	}
	 if(content.qualification){
		defaultContent.qualification=content.qualification
	}
	 if(content.yearOfExperience){
		defaultContent.yearOfExperience=content.yearOfExperience
	}
	 if(content.jobType){
		defaultContent.jobType=content.jobType
	}
	 if(content.jobSpecializations){
		defaultContent.jobSpecializations=content.jobSpecializations
	}
	 if(content.companyOverview){
		defaultContent.companyOverview=content.companyOverview
	}
	 if(content.companySize){
		defaultContent.companySize=content.companySize
	}
	 if(content.averageProcessingTime){
		defaultContent.averageProcessingTime=content.averageProcessingTime
	}
	 if(content.industry){
		defaultContent.industry=content.industry
	}
	else if(content.benefits){
		defaultContent.benefits=content.benefits
	}
	 if(content.jobDescription){
		defaultContent.jobDescription=content.jobDescription
	}
	 if(content.url){
		defaultContent.url=content.url
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
	await getAllFromJobPostRow()

	const ptime=getPostedTime("Posted on 11-Feb-22")
	
// console.log(cont)
});

const getAllFromJobPostRow=async()=>{
	const em = await ConnectionManager(true);
	const getAll=await em.find(JobPostRaw,{})

	for (let index = 0; index < getAll.length; index++) {
		const raw = getAll[index];
		const getRawContent=raw.rawContent
		const contents = getRawContent.split('\n');
		
		for (let cat = 0; cat < contents.length; cat++) {

			const cont = contentCat({
				jobName:contents[0],
				company:contents[1],
				location:contents[2],
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
			})
			
			console.log(cont)

		}
		
	}
}
