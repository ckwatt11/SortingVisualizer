import { swap } from "../sortVisualizer/SortVisualizer.jsx";

export function animateInsertionSort(array) {
  const copy = [...array];
  const anims = [];
  for (let i = 1; i < copy.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      anims.push([[j, j + 1], false]);
      if (copy[j + 1] < copy[j]) {
        anims.push([[j, copy[j + 1]], true]);
        anims.push([[j + 1, copy[j]], true]);
        swap(copy, j, j + 1);
      } else break;
    }
  }
  return anims;
}
