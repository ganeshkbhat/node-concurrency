/**
 * 
 */
const { fork } = require('child_process');

class ConcurrentProcesses {
  constructor() {
    this.workerPool = [];
  }

  runInProcesses(fn, data, numProcesses) {
    for (let i = 0; i < numProcesses; i++) {
      const childProcess = fork(__filename, [], {
        env: { ...process.env, IS_CHILD_PROCESS: 'true' },
        execArgv: [JSON.stringify({ fn: fn.toString(), data })], // Pass the arguments directly without null values
      });
      this.runChildProcess(childProcess);
      this.workerPool.push(childProcess);
    }
  }

  runChildProcess(childProcess) {
    childProcess.on('message', result => {
      console.log('Process Result:', result);
      childProcess.disconnect();
    });

    // childProcess.send({ fn, data });
  }
}

console.log(process.env.IS_CHILD_PROCESS);

if (process.env.IS_CHILD_PROCESS === 'true') {
  // // const { fn, data } = process.env;
  const { fn, data } = JSON.parse(process.execArgv[0] || '{}');
  
  console.log("IS_CHILD_PROCESS: ", fn, data);
  //// const result = require(eval(fn))(JSON.parse(data));
  const result = eval(fn)(JSON.parse(data));
  // process.send(result);
}

module.exports = ConcurrentProcesses;
