import { isMainThread, Worker } from "worker_threads";
import { JobStreetWorker } from "./JobStreetWorker.js";
import { WorkerThreadProcessError } from "../../domain/scheduler/worker_browser_err.js";
import { Scheduler } from "../../domain/scheduler/scheduler.js";

import { logger } from "../../domain/Logger.js";
import queue from "queue";
import { TaskRequestDTO } from "../../domain/scheduler/TaskDTO/TaskRequestDTO";
import { SupportedBrowserType } from "../../domain/scheduler/TaskDTO/SupportedBrowerType.js";
import { TaskResponseDTO } from "../../domain/scheduler/TaskDTO/TaskResponseDTO";
import { GenericTaskErrorDTO } from "../../domain/scheduler/Error/GenericTaskErrorDTO";
import { GenErrorHandlerMap } from "../../domain/scheduler/Error/ErrorHandler.js";

export class JobStreetScheduler extends Scheduler {
	constructor() {
		super();
		// this.initTask();
	}
	public static resolveWorkerFilePath() {
		const workerFp = JobStreetWorker.getFileAbsolutePath();
		let re = new RegExp("/src/.*", "i");
		const resolvedFpArray = re.exec(workerFp);
		const rawFp = resolvedFpArray![0];
		const outDir = "out";
		const resolvedPath = `./${outDir}${rawFp}`;
		logger.info(`Worker detected in ${resolvedPath}`);
		return resolvedPath;
	}
	public initTask() {
		const externalRef = [1, 1, 1, 1, 1];
		for (let taskNum = 0; taskNum < externalRef.length; taskNum++) {
			const taskDetail = externalRef[taskNum];
			const workReq: TaskRequestDTO = {
				browserType: SupportedBrowserType.Chromium,
				taskData: taskDetail!,
			};
			this.taskQueue.push(workReq);
		}
	}
}
