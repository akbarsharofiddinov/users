export default function returnAllPageCount(allCount) {
  const allPageCount = [];
  for(let i = 1; i <= Math.ceil(allCount / 3); i++) {
    allPageCount.push(i);
  }

  return allPageCount;
}