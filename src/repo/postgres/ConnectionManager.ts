import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";
import Book from "../table/Book.js";

const initSchema = async (orm: MikroORM<IDatabaseDriver<Connection>>) => {
	const generator = orm.getSchemaGenerator();

	await generator.createSchema();
};

export const ConnectionManager = async (init: boolean = false) => {
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
	if (init) {
		await initSchema(orm);
	}

	return orm.em.fork();
};
