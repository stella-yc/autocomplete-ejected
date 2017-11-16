
// return an array of the first ten elements of input array
export const firstTenArray = (arr) => {
  let results;
  if (arr.datalength > 10) {
    results = [];
    for (let i = 0; i < 10; i++) {
      results.push(arr[i]);
    }
  } else {
    results = arr;
  }
  return results;
};
