import { parentPort, workerData, isMainThread } from "worker_threads";
import {
	SupportedBrowserType,
	BrowserWorker,
	BrowserContextWorker,
} from "./BrowserContext.js";
export class WorkerThreadProcess {
	public process = () => {
		return new Promise(async (resolve, reject) => {
			let taskPayload: SupportedBrowserType = workerData;
			const browserWorker = await BrowserWorker.build(taskPayload);
			const browserContextWorker = await BrowserContextWorker.build(
				browserWorker
			);
			await browserContextWorker.launchPage();
			parentPort!.postMessage("Work done!");
			throw new Error();
			resolve(true);
		});
	};
	public static getFileAbsolutePath() {
		return import.meta.url;
	}
}
if (parentPort && !isMainThread) {
	const worker = new WorkerThreadProcess();
	worker.process();
}
