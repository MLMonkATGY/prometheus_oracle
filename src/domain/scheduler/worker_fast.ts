import { parentPort, workerData } from "worker_threads";
export interface reply {
	a: number;
}
const getFib = (numInt: number): any => {
	console.log(numInt);
	parentPort!.postMessage(numInt);
};
export const fp = () => {
	return import.meta.url;
};
if (parentPort) {
	parentPort!.on("message", (nextJob) => {
		console.log(nextJob);
		getFib(task);
	});
	const task = workerData;
	getFib(10);
}

// export function workerFilePath() {
// 	return import.meta.url;
// }
