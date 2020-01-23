const sampleSize = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};

export function getShuffledIntArray(start: number, end: number) {
  let n = end - start
  return sampleSize((new Array(n)).fill(0).map((e, i) => start + i), n)
}
