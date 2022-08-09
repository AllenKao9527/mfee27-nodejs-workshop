let ary = [
  {
    id: 1,
    type: 'A',
    price: 100,
  },
  {
    id: 2,
    type: 'B',
    price: 200,
  },
  {
    id: 3,
    type: 'A',
    price: 150,
  },
  {
    id: 4,
    type: 'C',
    price: 300,
  },
];

//filter

// 找出 type 是 A
let result = ary.filter((item) => {
  return item.type === 'A';
});

// O(n)
ary.filter((item) => item.type === 'A');

// result 也會是一個陣列
console.log(result);

// 用 for-loop

function filter(ary) {
  let result = [];
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].type === 'A') {
      result.push(ary[i]);
    }
  }
  return result;
}
console.log(filter(ary));

//find

let findResult = ary.find((item) => {
  return item.id > 2;
});

console.log(findResult);

// find for-loop

function find(ary) {
  // let findResult = [];
  // for (let i = 0; i < ary.length; i++) {
  //   if (ary[i].id > 2) {
  //     findResult.push(ary[i]);
  //     return findResult;
  //   }
  // }
  // // return findResult;
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].id > 2) {
      return ary[i];
    }
  }
}
console.log(find(ary));

//map

let mapResult = ary.map((item) => {
  return item.price * 2;
});

console.log(mapResult);

//map for-loop

function map(ary) {
  let mapResult = [];
  for (let i = 0; i < ary.length; i++) {
    // ary[i].price * 2;
    mapResult.push(ary[i].price * 2);
  }
  return mapResult;
}

console.log(map(ary));

//reduce

let reduceResult = ary.reduce(
  (total, ary) => {
    return {
      price: total.price + ary.price,
    };
  },
  { price: 0 }
);

console.log(reduceResult);

//reduce for-loop

function reduce(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i].price;
  }
  return { price: result };
}

console.log(reduce(ary));
