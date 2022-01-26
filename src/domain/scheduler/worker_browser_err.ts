import { parentPort, workerData, isMainThread } from "worker_threads";
import { BrowserWorker, BrowserContextWorker } from "./BrowserContext.js";
import { TaskRequestDTO } from "./TaskDTO/TaskRequestDTO";
import { SupportedBrowserType } from "./TaskDTO/SupportedBrowerType.js";
import { TaskResponseDTO } from "./TaskDTO/TaskResponseDTO";
import { IntendedTaskError } from "./Error/IntendedTaskError.js";
export class WorkerThreadProcessError {
	public process = async () => {
		const received: TaskRequestDTO = workerData;
		// console.log(`worker task : ${received}`);
		let taskPayload: SupportedBrowserType = received.browserType;
		const browserWorker = await BrowserWorker.build(taskPayload);
		const browserContextWorker = await BrowserContextWorker.build(
			browserWorker
		);
		await browserContextWorker.launchPage();

		throw new IntendedTaskError();
	};
	public static getFileAbsolutePath() {
		return import.meta.url;
	}
}
if (parentPort && !isMainThread) {
	const worker = new WorkerThreadProcessError();
	worker.process();
}
