import { parentPort, workerData, isMainThread } from "worker_threads";
import {
	BrowserWorker,
	BrowserContextWorker,
} from "../../domain/scheduler/BrowserContext.js";
import { TaskRequestDTO } from "../../domain/scheduler/TaskDTO/TaskRequestDTO";
import { SupportedBrowserType } from "../../domain/scheduler/TaskDTO/SupportedBrowerType.js";
import { IntendedTaskError } from "../../domain/scheduler/Error/IntendedTaskError.js";
import { TaskResponseDTO } from "../../domain/scheduler/TaskDTO/TaskResponseDTO";

export class JobStreetWorker {
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
	const worker = new JobStreetWorker();
	worker.process();
}
