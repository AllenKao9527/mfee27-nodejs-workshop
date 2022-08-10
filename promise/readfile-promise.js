const fs = require('fs');

function readFile(path, encode) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encode, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

let readResult = readFile('test.txt', 'utf8');
console.log(readResult);
readResult
  .then((data) => {
    console.log('檔案內容：', data);
  })
  .catch((err) => {
    console.error('發生錯誤：', err);
  });
