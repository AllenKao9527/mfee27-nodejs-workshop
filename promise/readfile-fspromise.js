const fsPromises = require('fs/promises');

(async () => {
  try {
    let promise = fsPromises.readFile('test.txt', 'utf8');
    console.log(await promise);
  } catch (err) {
    console.error(err);
  }
})();

// fsPromises
//   .readFile('test.txt', 'utf-8')
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
