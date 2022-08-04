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

//find

let findResult = ary.find((item) => {
  return item.id > 2;
});

console.log(findResult);

// find for-loop

function find(ary) {
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].id > 2) {
      return ary[i];
    }
  }
}
console.log(find(ary));
