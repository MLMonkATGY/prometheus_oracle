import { isMainThread, Worker } from "worker_threads";
import { WorkerThreadProcess } from "./worker_browser.js";
import { WorkerThreadProcessError } from "./worker_browser_err.js";

import { logger } from "./Logger.js";
import queue from "queue";
import { TaskRequestDTO } from "./TaskDTO/TaskRequestDTO";
import { SupportedBrowserType } from "./TaskDTO/SupportedBrowerType.js";
import { TaskResponseDTO } from "./TaskDTO/TaskResponseDTO";
import { GenericTaskErrorDTO } from "./Error/GenericTaskErrorDTO";
import { GenErrorHandlerMap } from "./Error/ErrorHandler.js";
export class Scheduler {
	public taskQueue: TaskRequestDTO[];
	public doneTaskReq: TaskRequestDTO[];
	public completedResp: TaskResponseDTO[];
	public errorHandlerMap: Map<string, (inputMsg: any) => void>;
	constructor() {
		this.taskQueue = [];
		this.doneTaskReq = [];
		this.completedResp = [];
		this.errorHandlerMap = GenErrorHandlerMap();

		this.initTask();
	}
	private workerThreadsMap: Map<number, Worker> = new Map<number, Worker>();
	private workerThreadsTaskMap: Map<number, TaskRequestDTO | undefined> =
		new Map<number, TaskRequestDTO>();

	public static resolveWorkerFilePath() {
		const workerFp = WorkerThreadProcessError.getFileAbsolutePath();
		let re = new RegExp("/src/.*", "i");
		const resolvedFpArray = re.exec(workerFp);
		const rawFp = resolvedFpArray![0];
		const outDir = "out";
		const resolvedPath = `./${outDir}${rawFp}`;
		logger.info(resolvedPath);
		return resolvedPath;
	}
	public initTask() {
		const externalRef = [1, 4, 5, 7, 99];
		for (let taskNum = 0; taskNum < externalRef.length; taskNum++) {
			const taskDetail = externalRef[taskNum];
			const workReq: TaskRequestDTO = {
				browserType: SupportedBrowserType.Chromium,
				taskData: taskDetail!,
			};
			this.taskQueue.push(workReq);
		}
	}
	public startWorker() {
		while (this.taskQueue.length > 0) {
			const req = this.taskQueue.shift();

			const worker = new Worker(Scheduler.resolveWorkerFilePath(), {
				workerData: req,
			});

			this.workerThreadsMap.set(worker.threadId, worker);
			this.workerThreadsTaskMap.set(worker.threadId, req);

			this.setupMsgChannel(worker.threadId);
		}
	}
	public setupMsgChannel(threadId: number) {
		const worker = this.workerThreadsMap.get(threadId);

		worker!.on("message", (notifyMsg: TaskResponseDTO) => {
			logger.info(`${notifyMsg.reponse} from worker thread`);
			this.completedResp.push(notifyMsg);
			const completedTask = this.workerThreadsTaskMap.get(worker!.threadId);
			console.log(completedTask);
			this.doneTaskReq.push(completedTask!);
			this.workerThreadsTaskMap.set(worker!.threadId, undefined);

			worker!.terminate();
		});

		worker!.on("error", (error: GenericTaskErrorDTO) => {
			const handler = this.errorHandlerMap.get(error.errId);
			if (handler) {
				handler(error.errId);
			}
			logger.error(error.errId);
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
