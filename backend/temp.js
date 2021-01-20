let arr = [2, 1, 3, 5, 7, 8];
console.log(arr);
arr.sort((a, b) => {
  return a - b;
});
console.log(arr);

arr.reduce((a, b) => {
  console.log(b);
});
