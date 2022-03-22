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
class JobStreetTable {
	@PrimaryKey()
	id!: number;
	@Property({ nullable: false })
	jobName!: string;
	@Property({ nullable: false })
	companyName!: string;
	@Property({ nullable: true })
	companyOverview!: string;
	@Property({ nullable: true })
	companySize!: string;
	@Property({ nullable: true })
	location!: string;
	@Property({ nullable: true })
	benefits?: string;
	@Property({ nullable: true })
	averageProcessingTime!: number;
	@Property({ nullable: true })
	industryType!: string;
	@Property({ nullable: true })
	jobDescription!: string;
	@Property({ nullable: true })
	careerLevel?: string;
	@Property({ nullable: true })
	qualification!: string;
	@Property({ nullable: true })
	yearsOfExperience?: number;
	@Property({ nullable: true })
	jobType?: string;
	@Property({ nullable: true })
	jobSpecializations!: string;
	@Property({ nullable: true })
	salary?: string;
	@Property({ nullable: false })
	url!: string;

	@Property({ nullable: false })
	postedTime: Date = new Date();
	@Property()
	createdAt: Date = new Date();
	@Property({ onUpdate: () => new Date() })
	updatedAt: Date = new Date();
	@Property({ version: true, nullable: false })
	version!: number;

	constructor(
		jobName: string,
		companyName: string,
		companyOverview: string,
		companySize: string,
		location: string,
		benefits: string,
		averageProcessingTime: number,
		industryType: string,
		jobDescription: string,
		careerLevel: string,
		qualification: string,
		yearsOfExperience: number,
		jobType: string,
		jobSpecializations: string,
		salary: string,
		url: string,
		version: number,
		postedTime: Date
	) {
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
		this.url = url;
		this.version = version;
		this.postedTime = postedTime;
	}
}
export default JobStreetTable;
