import { test, expect } from "@playwright/test";
import ContentFormat from "../src/domain/ContentFormat.enum.js";
import { ConnectionManager } from "../src/repo/postgres/ConnectionManager.js";
import JobPostRaw from "../src/repo/table/JobPostRaw.js";
import JobStreetTable from "../src/repo/table/JobStreetTable.js";
import WobbRaw from "../src/repo/table/WobbRaw.js";
import WobbTable from "../src/repo/table/WobbTable.js";

test("test connection ", async ({ page }) => {
	const conn = await ConnectionManager();
	expect(conn).toBeDefined();
});
const getRawContent = () => {
	const rawContent = `		
	{
		"props": {
			"pageProps": {
				"id": "jobs-malaysia-claritas-consulting-asia-job-software-developer-consultant-net",
				"job": {
					"id": "0dd55ecf-1c63-4a63-9505-764878d32008",
					"title": "Software Developer Consultant (.NET)",
					"image": "//resources.wobbjobs.com/resized/uploads/jobs-malaysia/job_images/0dd55ecf-1c63-4a63-9505-764878d32008/jobs-malaysia-software-developer-consultant-net-claritas-consulting-asia-1641436691_show.jpg",
					"image_thumb": "//resources.wobbjobs.com/resized/uploads/jobs-malaysia/job_images/0dd55ecf-1c63-4a63-9505-764878d32008/jobs-malaysia-software-developer-consultant-net-claritas-consulting-asia-1641436691_show.jpg",
					"image_mobile": "//resources.wobbjobs.com/resized/uploads/jobs-malaysia/job_images/0dd55ecf-1c63-4a63-9505-764878d32008/jobs-malaysia-software-developer-consultant-net-claritas-consulting-asia-1641436691_show.jpg",
					"image_position": "0px 0px",
					"image_size": null,
					"job_type": "Full-Time",
					"tracks": [{ "id": "32", "title": "IT - Software Development" }],
					"track_id": null,
					"state_region": "Selangor",
					"location": "Jaya One / Petaling Jaya",
					"description": "\u003cdiv\u003eYou will work in a software consulting team to build and support Claritas suites of business software on CRM, eCommerce \u0026amp; Analytics. You will get to involved in technology on cloud, big data and AI. This is an opportunity for you to work in a dynamic environment where you must take pride in module ownership and passionate in continuous improvement.\u003cbr\u003e\u003cbr\u003e\u003cstrong\u003eJob Responsibilities\u003c/strong\u003e\u003c/div\u003e\u003cul\u003e\u003cli\u003e\u003c!--block--\u003eDevelop robust, reliable \u0026amp; high traffic business application (backend, frontend, mobile).\u003c/li\u003e\u003cli\u003e\u003c!--block--\u003eMaintain and constantly optimize system, process and user experience of business application.\u003c/li\u003e\u003cli\u003e\u003c!--block--\u003eBuild, deploy and support custom portals and/or micro sites.\u003c/li\u003e\u003cli\u003e\u003c!--block--\u003eWork closely with customers and various department on product improvement.\u003c/li\u003e\u003c/ul\u003e",
					"short_description": "You will work in a software consulting team to build and support Claritas suites of business software on CRM, eCommerce \u0026 Analytics.",
					"requirements": "\u003cul\u003e\u003cli\u003eAt least 1 year web and/or mobile programming experience.\u003c/li\u003e\u003cli\u003e\u003c!--block--\u003eMust possess at least a professional certificate, degree or diploma in Computer Science, Software Engineering or equivalent.\u003c/li\u003e\u003cli\u003e\u003c!--block--\u003eExperience and knowledge in .NET technology stack.\u003c/li\u003e\u003cli\u003e\u003c!--block--\u003eMust have good coding, analytical and problem solving skills.\u003c/li\u003e\u003cli\u003e\u003c!--block--\u003ePassionate \u0026amp; take pride in module ownership; and always look to continuous improvement.\u003c/li\u003e\u003cli\u003e\u003c!--block--\u003eDemonstrate passion in latest technology and keeping up with industry trends.\u003c/li\u003e\u003cli\u003e\u003c!--block--\u003eKnowledge in MVC software application architecture is an added advantage.\u003c/li\u003e\u003cli\u003e\u003c!--block--\u003eGood understanding of mobile app technology is an added advantage.\u003c/li\u003e\u003c/ul\u003e",
					"bookmark": false,
					"have_applied": false,
					"have_rejected": false,
					"created_at": "2022-01-06 10:38:11 +0800",
					"salary": "RM3500 - RM7000",
					"expired": false,
					"boosted": true,
					"slug": "jobs-malaysia-claritas-consulting-asia-job-software-developer-consultant-net",
					"active": true,
					"external_job_url": "",
					"secondary_company_id": null,
					"company": {
						"id": "b3bd6286-6bac-4d0e-a42c-c0081583b952",
						"name": "Claritas Consulting Asia",
						"register_name": "Claritas Consulting (Asia) Sdn Bhd",
						"type_id": 3,
						"industry": "Technology-Software",
						"logo": "//s3.ap-southeast-1.amazonaws.com/resources.wobbjobs.com/uploads/company-logo/company_logo_image/b3bd6286-6bac-4d0e-a42c-c0081583b952/claritas-consulting-asia-1618394431.PNG",
						"short_description": "Claritas is a enterprise cloud computing  company focus on customer relationship management (CRM) and call center solutions.",
						"cover_image": "//resources.wobbjobs.com/resized/uploads/jobs-malaysia/company_images/25640/jobs-malaysia-claritas-consulting-asia-1618502154_show.jpg",
						"cover_image_thumb": "//resources.wobbjobs.com/resized/uploads/jobs-malaysia/company_images/25640/jobs-malaysia-claritas-consulting-asia-1618502154_thumb.jpg",
						"job_count": 2,
						"bookmark": false,
						"slug": "claritas-consulting-asia",
						"benefits": [
							{
								"title": "Happiness = Productivity",
								"description": "Get paid to work \u0026 have fun with snacks! Additional benefits for you on office carpark, dental \u0026 optical subsidy.",
								"icon_code": "heart"
							},
							{
								"title": "Flexi and Casual Everyday",
								"description": "Flexi and casual everyday - We are project-oriented and result driven.\r\n",
								"icon_code": "heart"
							},
							{
								"title": "Insurance Coverage",
								"description": "Life + medical insurance coverage for confirmed staff - Your medical is taken care of.\r\n",
								"icon_code": "heart"
							}
						],
						"profile": {
							"address": "5.049, Block J, 129 Offices, 72A, Jln Profesor Diraja Ungku Aziz, 46200 Petaling Jaya, Selangor, Malaysia.",
							"latitude": 3.1184035,
							"longitude": 101.6354371,
							"descriptions": [
								{
									"title": "About Us",
									"body": "\u003cdiv\u003eLarge enterprises are increasingly looking to cloud computing as a platform for the future. At Claritas, we are helping companies and brands around APAC region with strategies on how to leverage the power of cloud and AI. Claritas provides innovative cloud business platform for CRM, E-commerce \u0026amp; Contact Center. As top 10 CRM technology provider, Claritas team has over 10 years of experience and serving 600+ customer success stories across South East Asia. Find out about our product suites at Claritascrm.com, Claritascommerce.com \u0026amp; Claritascloud.com. We are expanding the team in Malaysia. This is a great opportunity for dynamic and passionate candidates to work with us on cutting edge technologies and enterprise projects around the region. Explore your career with us today!\u003c/div\u003e"
								},
								{
									"title": "Why Us?",
									"body": "\u003cul\u003e\u003cli\u003eHappiness is new productivity -\u0026nbsp; Get paid to work \u0026amp; have fun with snacks all day long.\u003c/li\u003e\u003cli\u003eLife + medical insurance coverage for confirmed staff - Your medical is taken care of.\u003c/li\u003e\u003cli\u003eFlexi and casual everyday - We are project-oriented and result driven.\u003c/li\u003e\u003cli\u003eAdditional benefits for you on office carpark, dental \u0026amp; optical subsidy.\u003c/li\u003e\u003c/ul\u003e"
								}
							],
							"images": [
								{
									"cover": true,
									"image": "//resources.wobbjobs.com/resized/uploads/jobs-malaysia/company_images/25640/jobs-malaysia-claritas-consulting-asia-1618502154_show.jpg"
								},
								{
									"cover": false,
									"image": "//resources.wobbjobs.com/resized/uploads/jobs-malaysia/company_images/25641/jobs-malaysia-claritas-consulting-asia-1618502670_show.jpg"
								},
								{
									"cover": false,
									"image": "//resources.wobbjobs.com/resized/uploads/jobs-malaysia/company_images/25642/jobs-malaysia-claritas-consulting-asia-1618502493_show.jpeg"
								},
								{
									"cover": false,
									"image": "//resources.wobbjobs.com/resized/uploads/jobs-malaysia/company_images/25643/jobs-malaysia-claritas-consulting-asia-1618502586_show.jpeg"
								}
							],
							"videos": [],
							"extras": []
						}
					},
					"image_sharing": "//resources.wobbjobs.com/resized/uploads/jobs-malaysia/job_images/0dd55ecf-1c63-4a63-9505-764878d32008/jobs-malaysia-software-developer-consultant-net-claritas-consulting-asia-1641436691_show.jpg",
					"structured_job_data": {
						"@context": "http://schema.org/",
						"@type": "JobPosting",
						"title": "Software Developer Consultant (.NET)",
						"description": "You will work in a software consulting team to build and support Claritas suites of business software on CRM, eCommerce and Analytics. You will get to involved in technology on cloud, big data and AI. This is an opportunity for you to work in a dynamic environment where you must take pride in module ownership and passionate in continuous improvement.  Job Responsibilities -Develop robust, reliable and high traffic business application (backend, frontend, mobile). -Maintain and constantly optimize system, process and user experience of business application. -Build, deploy and support custom portals and/or micro sites. -Work closely with customers and various department on product improvement.",
						"datePosted": "2022-01-06",
						"hiringOrganization": {
							"@type": "Organization",
							"name": "Claritas Consulting Asia",
							"sameAs": "http://www.claritas.asia",
							"logo": "https://resources.wobbjobs.com/uploads/company-logo/company_logo_image/b3bd6286-6bac-4d0e-a42c-c0081583b952/claritas-consulting-asia-1618394431.PNG"
						},
						"validThrough": "2023-01-03T15:09:41+08:00",
						"baseSalary": {
							"@type": "MonetaryAmount",
							"currency": "MYR",
							"value": {
								"@type": "QuantitativeValue",
								"minValue": 3500,
								"maxValue": 7000,
								"unitText": "MONTH"
							}
						},
						"jobLocation": {
							"@type": "Place",
							"address": {
								"@type": "PostalAddress",
								"streetAddress": "C-31-1, Jalan Profesor Diraja Ungku Aziz",
								"addressLocality": "Petaling Jaya",
								"addressRegion": "Selangor",
								"postalCode": "46200",
								"addressCountry": "MY"
							}
						},
						"employmentType": "FULL_TIME"
					}
				}
			},
			"__N_SSG": true
		},
		"page": "/jobs/[id]",
		"query": {
			"id": "jobs-malaysia-claritas-consulting-asia-job-software-developer-consultant-net"
		},
		"buildId": "ApDBGaWCSvV7_EW0IBtKl",
		"isFallback": false,
		"gsp": true,
		"scriptLoader": []
	}`;
	return rawContent;
};

const wobbRawContent = () => {
	const rawContent = 'hiredly-logo\n'
	'\n'
	'Sea Freight Coordinator & Customer Service\n'
	'Network Freight Sdn Bhd\n'
	'\n'
	'Kota Kemuning, Shah Alam 40460\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'Job Description\n'
	' \n'
	'\n'
	'Job description\n'
	'\n'
	'Check competitive rates with Liners, box operators and agents for FCL and LCL\n'
	'\n'
	'Communicate daily with operation team on export declaration and goods collections.\n'
	'\n'
	'Provide Shipping Instructions to Liners and related operators.\n'
	'\n'
	'Follow up closely until vessel departs and update to respective customers.\n'
	'\n'
	'Application of Export Permits.\n'
	'\n'
	'Communicate with Haulage company on the container positioning.\n'
	'\n'
	'Good Attitude, able to multi tasks and communicate efficiently with customers.\n'
	'\n'
	'Any other related jobs.\n'
	'\n'
	'Working Hours on 5 and 1/2 days (8.30am to 5.30pm) Monday to Friday with alternate Saturday off after confirmation.\n'
	'\n'
	'Working Experience of at least one year and able to start work immediately an added advantage\n'
	'\n'
	'Job Type: Full-time\n'
	'\n'
	'Job Requirements\n'
	'Secondary School SPM/O Level, \n'
	'\n'
	'Diploma, Advanced/Higher/Graduate Diploma\n'
	'\n'
	'Our Jobs\n'
	'Filter by Specialisation\n'
	'Similar Jobs You Might Like\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'\n'
	'Hiredly\n'
	'\n'
	'We are on an unwavering mission to be Asia’s most loved job search platform; helping people discover any job with any employer in the market.\n'
	'\n'
	'Our Strategic Partner\n'
	'\n'
	'linkedin\n'
	'Hiredly\n'
	'\n'
	'About Us\n'
	'Contact Us\n'
	'Newsroom\n'
	'FAQ\n'
	'Jobseeker\n'
	'\n'
	'Jobs by Specialisation\n'
	'Jobs by Location\n'
	'Jobs by Type\n'
	'Jobs by Experience Level\n'
	'Companies\n'
	'Advice\n'
	'Employer\n'
	'\n'
	'Start Hiring Today\n'
	'Headhunting Service\n'
	'app_store_download_button\n'
	'google_play_download_button\n'
	'app_gallery_download_button\n'
	'app_gallery_download_button\n'
	'© Copyright 2015 - 2022 Agensi Pekerjaan Wobb Sdn. Bhd.\n'
	'\n'
	'Community Guidelines\n'
	'Privacy Policy\n'
	'Terms & Conditions\n'
	'Site Map\n'
	''
	return rawContent
}

test("test add find ", async () => {
	const em = await ConnectionManager(true);
	const recordNumBefore = await em.count(JobPostRaw, {});

	const portalUrl = "https://www.jobstreet.com.my";
	const postUrl =
		"https://www.jobstreet.com.my/en/job/machine-learning-engineer-44191-4787146?jobId=jobstreet-my-job-4787146&sectionRank=1&token=0~d132bd46-81a6-42e2-9963-0884613bc971&fr=SRP%20View%20In%20New%20Tab";
	const version = 1;
	const rawContent = getRawContent();
	const rawContentType = ContentFormat.JSON;
	const payload = new JobPostRaw(
		portalUrl,
		postUrl,
		version,
		rawContent,
		rawContentType
	);
	em.persist(payload);
	await em.flush();
	const recordNumAfter = await em.count(JobPostRaw, {});

	expect(recordNumAfter).toBe(recordNumBefore + 1);
	const inserted = await em.findOneOrFail(JobPostRaw, { id: payload.id });
	expect(inserted.companyName).not.toBeDefined();
	expect(inserted.portalUrl).toBe(portalUrl);
});

test("test jobStreeet table", async () => {
	const em = await ConnectionManager(true);

	const location = "QQS";
	const jobName = "QQS";
	const companyName = "asd";
	const companyOverview = "asdasd";
	const companySize = "asd";
	const benefits = "asd";
	const averageProcessingTime = -1;
	const industryType = "asd";
	const jobDescription = "asd";
	const careerLevel = "asd";
	const qualification = "asd";
	const yearsOfExperience = -1;
	const jobType = "asd";
	const jobSpecializations = "asd";
	const salary = "asd";
	const url = "asd";
	const postedTime = new Date()

	const version = 1;
	const payload = new JobStreetTable(
		jobName,
		companyName,
		companyOverview,
		companySize,
		location,
		benefits,
		averageProcessingTime,
		industryType,
		jobDescription,
		careerLevel,
		qualification,
		yearsOfExperience,
		jobType,
		jobSpecializations,
		salary,
		url,
		version,
		postedTime
	);
	const recordNumBefore = await em.count(JobStreetTable, {});

	em.persist(payload);
	await em.flush();
	const recordNumAfter = await em.count(JobStreetTable, {});
	expect(recordNumAfter).toBeGreaterThan(recordNumBefore)
	const inserted = await em.findOneOrFail(JobStreetTable, { id: payload.id });
	expect(payload.url).toBe(inserted.url);
	expect(payload.jobName).toBe(inserted.jobName);
});

test("test wobbRaw table",async () => {
	const em = await ConnectionManager(true);

	const postUrl ="https://my.hiredly.com/jobs/jobs-malaysia-network-freight-sdn-bhd-job-sea-freight-coordinator-customer-service"
	const version = 1;
	const rawContent = wobbRawContent();
	const rawContentType = ContentFormat.TEXT;

	const payload = new WobbRaw(
		postUrl,
		version,
		rawContent,
		rawContentType
	);
	const recordNumBefore = await em.count(WobbRaw, {});

	await em.persistAndFlush(payload)
	const recordNumAfter = await em.count(WobbRaw, {});
	expect(recordNumAfter).toBeGreaterThan(recordNumBefore);

	const inserted = await em.findOneOrFail(WobbRaw, { id: payload.id });
	expect(inserted.postUrl).not.toBeDefined();
})

test("test wobb table",async () => {
	const em = await ConnectionManager(true);

	const location = "QQS";
	const jobName = "QQS";
	const companyName = "asd";
	const companyOverview = "asdasd";
	const benefits = "asd";
	const industryType = "asd";
	const jobDescription = "asd";
	const jobType = "asd";
	const jobSpecializations = "asd";
	const jobRequirements = "asd";
	const postUrl = "asd";
	const version = 1;
	const companyAddress = "asd"

	const payload = new WobbTable(
		jobName,
		companyName,
		companyAddress,
		companyOverview,
		location,
		benefits,
		industryType,
		jobDescription,
		jobType,
		jobSpecializations,
		jobRequirements,
		postUrl,
		version
	);
	const recordNumBefore = await em.count(WobbTable, {});
	await em.persistAndFlush(payload)
	const recordNumAfter = await em.count(WobbTable, {});
	expect(recordNumAfter).toBeGreaterThan(recordNumBefore)
	
	const inserted = await em.findOneOrFail(WobbTable, { id: payload.id });
	expect(payload.postUrl).toBe(inserted.postUrl);
	expect(payload.jobName).toBe(inserted.jobName);
})
