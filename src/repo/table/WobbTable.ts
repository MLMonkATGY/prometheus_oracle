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
	companyAddress!: string;
	@Property({ columnType: "text",nullable: false })
	companyOverview!: string;
	@Property({ nullable: true })
	location!: string;
	@Property({ nullable: true })
	benefits?: string;
	@Property({ nullable: true })
	industryType!: string;
	@Property({ columnType: "text",nullable: true })
	jobDescription!: string;
	@Property({ nullable: true })
	jobType?: string;
	@Property({ nullable: false })
	jobSpecializations!: string;
    @Property({ columnType: "text",nullable: false })
	jobRequirements!: string;
	@Property({ nullable: false })
	postUrl!: string;
	@Property({ version: true, nullable: false })
	version!: number;

	@Property()
	createdAt: Date = new Date();
	@Property({ onUpdate: () => new Date() })
	updatedAt: Date = new Date();

	constructor(
		jobName: string,
		companyName: string,
        companyAddress: string,
		companyOverview: string,
		location: string,
		benefits: string,
		industryType: string,
		jobDescription: string,
		jobType: string,
		jobSpecializations: string,
        jobRequirements: string,
		postUrl: string,
		version: number,
	) {
		this.jobName = jobName;
		this.companyName = companyName;
		this.companyOverview = companyOverview;
        this.companyAddress = companyAddress;
		this.location = location;
		this.benefits = benefits;
		this.industryType = industryType;
		this.jobDescription = jobDescription;
		this.jobType = jobType;
		this.jobSpecializations = jobSpecializations;
        this.jobRequirements = jobRequirements;
		this.postUrl = postUrl;
		this.version = version;
	}
}
export default JobStreetTable;
