async function test() {
  console.log(1);
  // await 以下會暫停 -->先5 後23
  //沒有await 不會暫停 --> 3 5 再回來做2
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 3000);
  });
  console.log(3);
}
console.log(4);
test();
console.log(5);
