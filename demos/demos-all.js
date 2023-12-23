// main.js
const ConcurrentRunner = require('../src/index');

function exampleFunction(data) {
  // Your function logic goes here
  let d = data.map((c) => c*2); 
  console.log("Testing return", d, data)
  return d;
}

const concurrentRunner = new ConcurrentRunner();

const numThreads = 3;
const numProcesses = 2;
const inputData = [1, 2, 3, 4, 5];

// // Run function in multiple threads
console.log("Final Results Threads: ", concurrentRunner.runInThreads(exampleFunction, inputData, numThreads));

// Run function in multiple processes
// concurrentRunner.runInProcesses(exampleFunction, inputData, numProcesses);
