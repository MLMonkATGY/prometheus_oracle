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
	@Property({ nullable: false })
	jobSpecializations!: string;
	@Property({ nullable: true })
	salary?: string;
	@Property({ nullable: false })
	url!: string;

	@Property({ nullable: false })
	postedTime: string;
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
		averageProcessingTime: string,
		industryType: string,
		jobDescription: string,
		careerLevel: string,
		qualification: string,
		yearsOfExperience: string,
		jobType: string,
		jobSpecializations: string,
		salary: string,
		url: string,
		version: number,
		postedTime: string
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
