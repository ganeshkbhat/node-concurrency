/**
 * 
 */
const { Worker, isMainThread, workerData } = require('worker_threads');

class ConcurrentThreads {
  constructor() {
    this.workerPool = [];
  }

  runInThreads(fn, data, numThreads) {
    if (isMainThread) {
      for (let i = 0; i < numThreads; i++) {
        const worker = new Worker(__filename, { workerData: { fn: fn.toString(), data } });
        this.workerPool.push(worker);
      }
    } else {
      this.runWorkerThread(workerData.fn, workerData.data);
    }
  }

  runWorkerThread(fn, data) {
    const parsedFn = eval(`(${fn})`); // Convert string back to function
    let result;
    try {
      result = parsedFn(data);
    } catch (error) {
      result = error;
    }
    parentPort.postMessage(result);
  }

}

if (!isMainThread) {
  const { parentPort } = require('worker_threads');
  const { fn, data } = workerData;
  const parsedFn = eval(`(${fn})`); // Convert string back to function
  const result = parsedFn(data);
  parentPort.postMessage(result);
}

module.exports = ConcurrentThreads;
