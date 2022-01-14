import { ConnectionManager } from "../repo/postgres/ConnectionManager.js";

const run = async (a: number, b: number) => {
	const conn = await ConnectionManager();
	console.log(a + b);
	return a + b;
};
export default run;
run(3, 5);
