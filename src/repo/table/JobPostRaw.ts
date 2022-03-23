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
class JobPostRaw {
	@PrimaryKey()
	id!: number;
	@Property({ nullable: false })
	portalUrl!: string;
	@Property({ columnType: "text",nullable: false })
	postUrl!: string;
	@Property({ nullable: true })
	companyName?: string;
	@Property({ nullable: true })
	companyUrl?: string;

	@Property({ columnType: "text", nullable: false })
	rawContent!: string;
	@Enum({ items: () => ContentFormat, nullable: false })
	contentFormat!: ContentFormat;
	@Property()
	createdAt: Date = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt: Date = new Date();
	@Property({ version: true, nullable: false })
	version!: number;

	constructor(
		portalUrl: string,
		postUrl: string,
		version: number,
		rawContent: string,
		contentFormat: ContentFormat,
		companyName?: string,
		companyUrl?: string
	) {
		this.portalUrl = portalUrl;
		this.postUrl = postUrl;
		this.version = version;
		this.companyName = companyName;
		this.companyUrl = companyUrl;
		this.rawContent = rawContent;
		this.contentFormat = contentFormat;
	}
}
export default JobPostRaw;
