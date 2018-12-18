// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
const fs = require('fs');

console.info('promises init');

const writeFile = (file, content) => new Promise((resolve, reject) => {
    fs.writeFile('test.log', `soy un example ${new Date().getTime()}`, err => err ? reject() : resolve());
  });


const readFile = file => new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => err ? reject(err) : resolve(data.toString()));
  });


const unLink = (file) => {
  return new Promise((resolve, reject) => {
    fs.unlink(file, (err2) => {
      if (err2) return reject(err2);
      return resolve();
    });
  });
};

const emuleTasks = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.info('termino ');
      resolve(true);
    }, 1000);
  });
}


const doAll = async () => {
  try {
    const fileName = 'test.log';
    await writeFile(fileName, `soy un example ${new Date().getTime()}`);
    const content = await readFile(fileName);
    console.info('Content: ', content);
    await unLink(fileName);
  } catch (err) {
    console.error('Algo se rompio: ', err);
    return Promise.reject(err);
  }
};

doAll();
console.info('end');
