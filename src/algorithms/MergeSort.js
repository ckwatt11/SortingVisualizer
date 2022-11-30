export function animateMergeSort(array) {
    const copy = [...array];
    const len = copy.length;
    const aux = Array(len);
    const anims = [];
    msHelper(copy, aux, 0, len - 1, anims);
    return anims;
  }
  
  function msHelper(array, aux, left, right, anims) {
    if (right <= left) return;
    const mid = left + Math.floor((right - left) / 2);
    msHelper(array, aux, left, mid, anims);
    msHelper(array, aux, mid + 1, right, anims);
    merge(array, aux, left, mid, right, anims);
  }
  
  function merge(array, aux, left, mid, right, anims) {
    for (let i = left; i <= right; i++) aux[i] = array[i];
    let i = left;
    let j = mid + 1;
    for (let k = left; k <= right; k++) {
      if (i > mid) {
        anims.push([[j], false]);
        anims.push([[k, aux[j]], true]);
        array[k] = aux[j++];
      } else if (j > right) {
        anims.push([[i], false]);
        anims.push([[k, aux[i]], true]);
        array[k] = aux[i++];
      } else if (aux[j] < aux[i]) {
        anims.push([[i, j], false]);
        anims.push([[k, aux[j]], true]);
        array[k] = aux[j++];
      } else {
        anims.push([[i, j], false]);
        anims.push([[k, aux[i]], true]);
        array[k] = aux[i++];
      }
    }
  }
  