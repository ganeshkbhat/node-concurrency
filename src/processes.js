/**
 * 
 */
const { fork } = require('child_process');
const cluster = require('cluster');

// class ParallelProcesses {

//   constructor() {
//     this.processPool = [];
//     this.workerPool = [];
//   }

//   runInConcurrentProcesses(func, data, numProcesses) {
//     for (let i = 0; i < numProcesses; i++) {
//       const childProcess = fork(__filename, ["child"], {
//         stdio: 'inherit',
//         env: { ...process.env, IS_CHILD_PROCESS: 'true' },
//         execArgv: [data, 'child'],
//       });
//       childProcess.on('message', (msg) => {
//         console.log(msg);
//       });
//       childProcess.send({ func: func.toString() }); // Send the function to the child process
//       this.processPool.push(childProcess);
//     }
//   }

//   stop(id) {
//     if (!!id) {
//       this.processPool[id].kill();
//     } else {
//       this.processPool.forEach(process => process.kill());
//     }
//   }

//   runInProcesses(fn, data, numProcesses) {
//     for (let i = 0; i < numProcesses; i++) {
//       const childProcess = fork(__filename, ["child"], {
//         env: { ...process.env, IS_CHILD_PROCESS: 'true' },
//         execArgv: [JSON.stringify({ fn: fn.toString(), data })], // Pass the arguments directly without null values
//       });
//       this.runChildProcess(childProcess);
//       this.workerPool.push(childProcess);
//     }
//   }

//   runChildProcess(childProcess) {
//     childProcess.on('message', result => {
//       console.log('Process Result:', result);
//       childProcess.disconnect();
//     });

//     // childProcess.send({ fn, data });
//   }
// }

// console.log(process.env.IS_CHILD_PROCESS);

// if (process.argv[2] === 'child' || !!process.env.IS_CHILD_PROCESS) {
//   // // const { fn, data } = process.env;
//   const { fn, data } = JSON.parse(process.execArgv[0] || '{}');
//   console.log("IS_CHILD_PROCESS: ", fn, data);
//   //// const result = require(eval(fn))(JSON.parse(data));
//   const result = eval(fn)(JSON.parse(data));
//   // process.send(result);
// }

// if (process.argv[0] === 'child') {
//   process.on('message', ({ func, data }) => {
//     const userFunction = eval(`(${func})`); // Convert the string back to a function
//     console.log("Testing function");
//     userFunction(data);
//   });
// }


class ConcurrentProcesses {

  constructor() {
    this.processPool = [];
    this.workerPool = [];
  }

  runInConcurrentProcesses(func, data, numProcesses) {
    if (cluster.isPrimary) {
      for (let i = 0; i < numProcesses; i++) {
        const childProcess = cluster.fork({
          execArgv: [],
          exec: __filename,
          args: [...process.argv.slice(2), "child"],
          // cwd: undefined,
          serialization: false,
          silent: false,
          // stdio: [],
          // uid: 
          // gid: 
          // inspectPort: 
          // windowsHide:

        });
        this.runChildProcess(childProcess);
        childProcess.send({ func: func.toString(), data: data }); // Send the function to the child process
        this.processPool.push(childProcess);
      }
    }

  }

  runChildProcess(childProcess) {
    childProcess.on('message', result => {
      console.log('Process Result Final [T.B.Exported]:', result);
      // childProcess.disconnect();
    });
  }

  stop(id) {
    if (!!id && id instanceof cluster) {
      for (const worker of Object.values(cluster.workers)) {
        worker.kill();
      }
    } else if (!!id) {
      this.processPool[id].kill();
    } else {
      this.processPool.forEach(process => process.kill());
    }
  }

}

if (cluster.isWorker) {
  process.on('message', ({ func, data }) => {
    const userFunction = eval(`(${func})`); // Convert the string back to a function
    // console.log("Testing child Process function");
    let results = userFunction(data);
    process.send(results);
  });
}

module.exports = ConcurrentProcesses;
