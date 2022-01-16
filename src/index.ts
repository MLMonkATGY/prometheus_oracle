import { ConnectionManager } from "./repo/postgres/ConnectionManager.js";
const a = () => {
	return new Promise(async (resolve, reject) => {
		const conn = await ConnectionManager();
		console.log(conn);
		resolve(true);
	});
};

a();
