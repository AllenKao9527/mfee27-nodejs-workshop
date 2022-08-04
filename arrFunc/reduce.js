let ary = [
  {
    id: 1,
    type: "A",
    price: 100,
  },
  {
    id: 2,
    type: "B",
    price: 200,
  },
  {
    id: 3,
    type: "A",
    price: 150,
  },
  {
    id: 4,
    type: "C",
    price: 300,
  },
];

//reduce

let reduceResult = ary.reduce((total, ary) => {
  return total + ary.price;
}, 0);

console.log(reduceResult);

//reduce for-loop

function reduce(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i].price;
  }
  return result;
}

console.log(reduce(ary));
