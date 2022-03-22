import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";
import getSettings from "../settings.js";
import GetTableEntity from "./RegisterTableEntity.js";
const envSettings = getSettings();
const initSchema = async (orm: MikroORM<IDatabaseDriver<Connection>>) => {
	const generator = orm.getSchemaGenerator();
	try {
		await generator.createSchema();
	} catch (err) {
		console.log("Relations already exist. Skip creation.");
	}
};

export const ConnectionManager = async (init: boolean = false) => {
	const username = "oracle_alextay";
	const password = "oracle_alextay";
	const ip = envSettings.dbSettings.host;
	const cwd = process.cwd();
	const orm = await MikroORM.init({
		entities: GetTableEntity(),
		baseDir: cwd,
		debug: false,
		dbName: "prometheus_oracle",
		type: "postgresql", // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
		clientUrl: `postgresql://${username}:${password}@${ip}:5432`, // defaults to 'mongodb://localhost:27017' for mongodb driver
	});
	if (init) {
		await initSchema(orm);
	}

	return orm.em.fork();
};
