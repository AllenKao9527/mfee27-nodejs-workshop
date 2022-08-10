const fs = require('fs');

function readFile(path, encode) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encode, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

async function read() {
  console.log('test');
  try {
    let fileContent = await readFile('test.txt', 'utf8');
    return fileContent;
  } catch (err) {
    console.error('發生錯誤：', err);
    // throw new Error('error');
  }
}

let readResult = read();
console.log(readResult);
readResult
  .then((data) => {
    console.log('檔案內容: ', data);
  })
  .catch((err) => {
    console.error(err);
  });
