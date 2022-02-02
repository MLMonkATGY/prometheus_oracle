import { JobStreetScheduler } from "./jobstreet/JobStreetScheduler.js";
import { Scheduler } from "../domain/scheduler/scheduler.js";

import { isMainThread, Worker } from "worker_threads";
import { logger } from "../domain/Logger.js";

if (isMainThread) {
	logger.info("starts");
	const scheduler = new Scheduler();
	scheduler.startWorker();
}
