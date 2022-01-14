import {
	Entity,
	Property,
	ManyToOne,
	PrimaryKey,
	SerializedPrimaryKey,
} from "@mikro-orm/core";
@Entity()
class Book {
	@PrimaryKey()
	id!: number;
	@Property()
	title!: string;
	@Property({ nullable: true })
	author?: number;
	@Property({ nullable: false })
	author2!: number;
	@Property()
	createdAt: Date = new Date();
	@Property({ version: true })
	version!: number;
	@Property({ onUpdate: () => new Date() })
	updatedAt: Date = new Date();
}
export default Book;
