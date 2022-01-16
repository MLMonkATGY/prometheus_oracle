import { isMainThread, Worker } from "worker_threads";
import { WorkerThreadProcess } from "./worker_browser.js";
import { logger } from "./Logger.js";
export class Scheduler {
	private workerThreadsMap: Map<number, Worker> = new Map<number, Worker>();
	public static resolveWorkerFilePath() {
		const workerFp = WorkerThreadProcess.getFileAbsolutePath();
		let re = new RegExp("/src/.*", "i");
		const resolvedFpArray = re.exec(workerFp);
		const rawFp = resolvedFpArray![0];
		const outDir = "out";
		const resolvedPath = `./${outDir}${rawFp}`;
		logger.info(resolvedPath);
		return resolvedPath;
	}
	public startWorker() {
		const worker = new Worker(Scheduler.resolveWorkerFilePath(), {
			workerData: { a: 1 },
		});

		this.workerThreadsMap.set(worker.threadId, worker);
		this.setupMsgChannel(worker.threadId);
	}
	public setupMsgChannel(threadId: number) {
		const worker = this.workerThreadsMap.get(threadId);

		worker!.on("message", (notifyMsg: any) => {
			logger.info(`${notifyMsg} from worker thread`);
		});

		worker!.on("error", (error) => {
			logger.error(error);
		});

		worker!.on("exit", (exitCode) => {
			logger.warn(exitCode);
		});
	}
}
if (isMainThread) {
	logger.info("starts");
	const scheduler = new Scheduler();
	scheduler.startWorker();
}
