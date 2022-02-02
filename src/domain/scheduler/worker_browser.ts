import { parentPort, workerData, isMainThread } from "worker_threads";
import { BrowserWorker, BrowserContextWorker } from "./BrowserContext.js";
import { TaskRequestDTO } from "./TaskDTO/TaskRequestDTO";
import { SupportedBrowserType } from "./TaskDTO/SupportedBrowerType.js";
import { TaskResponseDTO } from "./TaskDTO/TaskResponseDTO";

export class WorkerThreadProcess {
	public process = async () => {
		const received: TaskRequestDTO = workerData;
		// console.log(`worker task : ${received}`);
		let taskPayload: SupportedBrowserType = received.browserType;
		const browserWorker = await BrowserWorker.build(taskPayload);
		const browserContextWorker = await BrowserContextWorker.build(
			browserWorker
		);
		const page = await browserContextWorker.browserContext.newPage();
		await page.goto("https://example.com");
		await page.waitForTimeout(3000);
		const resp: TaskResponseDTO = {
			reponse: received.taskData * 2,
		};
		parentPort!.postMessage(resp);
	};
	public static getFileAbsolutePath() {
		return import.meta.url;
	}
}
if (parentPort && !isMainThread) {
	const worker = new WorkerThreadProcess();
	worker.process();
}
