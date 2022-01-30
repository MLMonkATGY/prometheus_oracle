import {
	Entity,
	Property,
	ManyToOne,
	PrimaryKey,
	SerializedPrimaryKey,
	Enum,
} from "@mikro-orm/core";
import ContentFormat from "../../domain/ContentFormat.enum.js";
@Entity()
class JobStreet {
	@PrimaryKey()
	id!: number;
	@Property({ nullable: false })
	jobName!: string;
	@Property({ nullable: false })
	companyName!: string;
	@Property({ nullable: false })
	companyOverview!: string;
	@Property({ nullable: true })
	companySize!: string;
	@Property({ nullable: false })
	location!: string;
	@Property({ nullable: true })
	benefits?: string;
	@Property({ nullable: true })
	averageProcessingTime!: string;
	@Property({ nullable: false })
	industryType!: string;
	@Property({ nullable: false })
	jobDescription!: string;
	@Property({ nullable: true })
	careerLevel?: string;
	@Property({ nullable: false })
	qualification!: string;
	@Property({ nullable: true })
	yearsOfExperience?: string;
	@Property({ nullable: true })
	jobType?: string;
	@Property({ nullable: true })
	jobSpecializations?: string;
	@Property({ nullable: true })
	salary?: string;
	@Property({ nullable: true })
	url?: string;

	@Property({ columnType: "text", nullable: false })
	rawContent!: string;
	@Enum({ items: () => ContentFormat, nullable: false })
	contentFormat!: ContentFormat;
	@Property({ nullable: false })
	postedTime: Date = new Date();
	@Property()
	createdAt: Date = new Date();
	@Property({ onUpdate: () => new Date() })
	updatedAt: Date = new Date();
	@Property({ version: true, nullable: false })
	version!: number;

	constructor(
		id: number,
		jobName: string,
		companyName: string,
		companyOverview: string,
		companySize: string,
		location: string,
		benefits: string,
		averageProcessingTime: string,
		industryType: string,
		jobDescription: string,
		careerLevel: string,
		qualification: string,
		yearsOfExperience: string,
		jobType: string,
		jobSpecializations: string,
		salary: string,
		contentFormat: ContentFormat,
		rawContent: string,
		url: string,
		version: number
	) {
		this.id = id;
		this.jobName = jobName;
		this.companyName = companyName;
		this.companyOverview = companyOverview;
		this.companySize = companySize;
		this.location = location;
		this.benefits = benefits;
		this.averageProcessingTime = averageProcessingTime;
		this.industryType = industryType;
		this.jobDescription = jobDescription;
		this.careerLevel = careerLevel;
		this.qualification = qualification;
		this.yearsOfExperience = yearsOfExperience;
		this.jobType = jobType;
		this.jobSpecializations = jobSpecializations;
		this.salary = salary;
		this.contentFormat = contentFormat;
		this.url = url;
		this.rawContent = rawContent;
		this.version = version;
	}
}
export default JobStreet;
