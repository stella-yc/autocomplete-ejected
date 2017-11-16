
// return an array of the first ten elements of input array
export const firstTenElements = (arr) => {
  let results;
  if (arr.length > 10) {
    results = [];
    for (let i = 0; i < 10; i++) {
      results.push(arr[i]);
    }
  } else {
    results = arr;
  }
  return results;
};

// fine for small arrays (we expect no more than 20 results)
export const uniqueVals = (arr) => {
  const seen = {};
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    seen[current.id] = current;
  }
  return Object.keys(seen).map(id => seen[id]);
}
