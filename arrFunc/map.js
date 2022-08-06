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

//map

let mapResult = ary.map((item) => {
  return item.price * 2;
  // return {
  //   ...item,
  //   price: item.price * 2
  // }
});

console.log(mapResult);

//map for-loop

function map(ary) {
  let mapResult = [];
  for (let i = 0; i < ary.length; i++) {
    mapResult.push(ary[i].price * 2);
  }
  return mapResult;
}

console.log(map(ary));
