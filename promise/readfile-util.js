const fs = require('fs');
const util = require('util');

let readfilePromise = util.promisify(fs.readFile);

readfilePromise('test.txt', 'utf8')
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.error(e);
  });
