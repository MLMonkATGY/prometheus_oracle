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
class WobbRaw {
	@PrimaryKey()
	id!: number;
	@Property({ nullable: false })
	postUrl!: string;
	@Property({ columnType: "text", nullable: false })
	rawContent!: string;
	@Enum({ items: () => ContentFormat, nullable: false })
	contentFormat!: ContentFormat;
    @Property({ version: true, nullable: false })
	version!: number;
	@Property()
	createdAt: Date = new Date();
	@Property({ onUpdate: () => new Date() })
	updatedAt: Date = new Date();
	
	constructor(
		postUrl: string,
		version: number,
		rawContent: string,
		contentFormat: ContentFormat,
	) {
		this.postUrl = postUrl;
		this.version = version;
		this.rawContent = rawContent;
		this.contentFormat = contentFormat;
	}
}
export default WobbRaw;
