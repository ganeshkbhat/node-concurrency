// // test/concurrent-runner.test.js
// const { expect } = require('chai');
// const sinon = require('sinon');
// const ConcurrentRunner = require('../concurrent-runner');

// describe('ConcurrentRunner', () => {
//   describe('runInThreads', () => {
//     it('should run function in multiple threads with string data', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = data => data.toUpperCase();
//       const data = 'hello';
//       const numThreads = 3;

//       concurrentRunner.runInThreads(fn, data, numThreads);

//       sinon.assert.calledThrice(console.log);
//     });

//     it('should run function in multiple threads with number data', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = data => data * 2;
//       const data = 5;
//       const numThreads = 3;

//       concurrentRunner.runInThreads(fn, data, numThreads);

//       sinon.assert.calledThrice(console.log);
//     });

//     it('should run function in multiple threads with array data', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = data => data.map(item => item * 2);
//       const data = [1, 2, 3, 4, 5];
//       const numThreads = 3;

//       concurrentRunner.runInThreads(fn, data, numThreads);

//       sinon.assert.calledThrice(console.log);
//     });

//     it('should run function in multiple threads with set data', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = data => new Set([...data].map(item => item.toUpperCase()));
//       const data = new Set(['apple', 'banana', 'orange']);
//       const numThreads = 3;

//       concurrentRunner.runInThreads(fn, data, numThreads);

//       sinon.assert.calledThrice(console.log);
//     });

//     it('should run function in multiple threads with object data', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = data => ({ result: data.value * 2 });
//       const data = { value: 10 };
//       const numThreads = 3;

//       concurrentRunner.runInThreads(fn, data, numThreads);

//       sinon.assert.calledThrice(console.log);
//     });
//   });

//   describe('runInProcesses', () => {
//     it('should run function in multiple processes with string data', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = data => data.toUpperCase();
//       const data = 'hello';
//       const numProcesses = 2;

//       concurrentRunner.runInProcesses(fn, data, numProcesses);

//       sinon.assert.calledTwice(console.log);
//     });

//     it('should run function in multiple processes with number data', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = data => data * 2;
//       const data = 5;
//       const numProcesses = 2;

//       concurrentRunner.runInProcesses(fn, data, numProcesses);

//       sinon.assert.calledTwice(console.log);
//     });

//     it('should run function in multiple processes with array data', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = data => data.map(item => item * 2);
//       const data = [1, 2, 3, 4, 5];
//       const numProcesses = 2;

//       concurrentRunner.runInProcesses(fn, data, numProcesses);

//       sinon.assert.calledTwice(console.log);
//     });

//     it('should run function in multiple processes with set data', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = data => new Set([...data].map(item => item.toUpperCase()));
//       const data = new Set(['apple', 'banana', 'orange']);
//       const numProcesses = 2;

//       concurrentRunner.runInProcesses(fn, data, numProcesses);

//       sinon.assert.calledTwice(console.log);
//     });

//     it('should run function in multiple processes with object data', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = data => ({ result: data.value * 2 });
//       const data = { value: 10 };
//       const numProcesses = 2;

//       concurrentRunner.runInProcesses(fn, data, numProcesses);

//       sinon.assert.calledTwice(console.log);
//     });
//   });
// });


// // test/concurrent-runner-error.test.js
// const { expect } = require('chai');
// const sinon = require('sinon');
// const ConcurrentRunner = require('../concurrent-runner');

// describe('ConcurrentRunner - Error Cases', () => {
//   describe('runInThreads', () => {
//     it('should throw an error if a string is passed instead of a function', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = 'not a function';
//       const data = [1, 2, 3];
//       const numThreads = 3;

//       expect(() => concurrentRunner.runInThreads(fn, data, numThreads)).to.throw(TypeError);
//     });

//     it('should throw an error if an object is passed instead of a function', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = { invalid: 'function' };
//       const data = [1, 2, 3];
//       const numThreads = 3;

//       expect(() => concurrentRunner.runInThreads(fn, data, numThreads)).to.throw(TypeError);
//     });

//     it('should throw an error if a number is passed instead of a function', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = 42;
//       const data = [1, 2, 3];
//       const numThreads = 3;

//       expect(() => concurrentRunner.runInThreads(fn, data, numThreads)).to.throw(TypeError);
//     });
//   });

//   describe('runInProcesses', () => {
//     it('should throw an error if a string is passed instead of a function', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = 'not a function';
//       const data = [1, 2, 3];
//       const numProcesses = 2;

//       expect(() => concurrentRunner.runInProcesses(fn, data, numProcesses)).to.throw(TypeError);
//     });

//     it('should throw an error if an object is passed instead of a function', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = { invalid: 'function' };
//       const data = [1, 2, 3];
//       const numProcesses = 2;

//       expect(() => concurrentRunner.runInProcesses(fn, data, numProcesses)).to.throw(TypeError);
//     });

//     it('should throw an error if a number is passed instead of a function', () => {
//       const concurrentRunner = new ConcurrentRunner();
//       const fn = 42;
//       const data = [1, 2, 3];
//       const numProcesses = 2;

//       expect(() => concurrentRunner.runInProcesses(fn, data, numProcesses)).to.throw(TypeError);
//     });
//   });
// });
