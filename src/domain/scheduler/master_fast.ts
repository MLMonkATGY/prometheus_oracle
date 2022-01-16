import { Worker } from "worker_threads";
import { reply, fp } from "./worker_fast.js";
let num = 30;
export interface payloadInterface {
	num: number;
}
const workerFilePath = fp();
console.log(workerFilePath);
const sharedArrayBuffer = new SharedArrayBuffer(
	Int8Array.BYTES_PER_ELEMENT * 64
);
let arr = new Uint8Array(sharedArrayBuffer);
const byteArray = new TextEncoder().encode("30");
arr = byteArray;

//Create new worker
const worker = new Worker("./out/src/domain/scheduler/master_fast.js", {
	workerData: arr,
});
worker.threadId;
//Listen for a message from worker
worker.on("message", (notifyMsg: reply) => {
	console.log(`${num}th Fibonacci Number: ${notifyMsg.a}`);
	worker.postMessage(notifyMsg.a);
});

worker.on("error", (error) => {
	console.log(error);
});

worker.on("exit", (exitCode) => {
	console.log(exitCode);
});

console.log("Executed in the parent thread");
