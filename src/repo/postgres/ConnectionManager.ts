import { MikroORM } from "@mikro-orm/core";
import Book from "../table/Book.js";
export const ConnectionManager = async () => {
	const username = "oracle_alextay";
	const password = "oracle_alextay";
	const ip = "172.78.0.44";
	const cwd = process.cwd();
	const orm = await MikroORM.init({
		entities: [Book],
		baseDir: cwd,

		dbName: "prometheus_oracle",
		type: "postgresql", // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
		clientUrl: `postgresql://${username}:${password}@${ip}:5432`, // defaults to 'mongodb://localhost:27017' for mongodb driver
	});
	console.log(orm.em); // access EntityManager via `em` property
	const generator = orm.getSchemaGenerator();
	await generator.dropSchema();

	await generator.createSchema();

	return orm;
};
