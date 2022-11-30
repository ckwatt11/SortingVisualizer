import { swap } from "../sortVisualizer/SortVisualizer.jsx";

export function animateQuickSort(array) {
  const copy = [...array];
  const anims = [];
  helper(copy, 0, copy.length - 1, anims);
  return anims;
}

function helper(array, l, r, anims) {
  if (l >= r) return;
  const part = partition(array, l, r, anims);
  helper(array, l, part, anims);
  helper(array, part + 1, r, anims);
}

function partition(array, l, r, anims) {
  let i = l;
  let j = r + 1;
  const pivot = array[l];
  while (true) {

    while (array[++i] <= pivot) {

      if (i === r) break;
      anims.push([[i], false]);
    }
    while (array[--j] >= pivot) {

      if (j === l) break;
      anims.push([[j], false]);
    }
    if (j <= i) break;

    anims.push([[i, array[j]], true]);
    anims.push([[j, array[i]], true]);
    swap(array, i, j);
  }
  anims.push([[l, array[j]], true]);
  anims.push([[j, array[l]], true]);
  swap(array, l, j);
  return j;
}
