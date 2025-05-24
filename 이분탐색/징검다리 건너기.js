function solution(stones, k) {
  let min = 1;
  let max = 200_000_000;
  let mid;

  while (min <= max) {
    mid = Math.floor((max + min) / 2);
    const copiedStones = [...stones];

    let cntZero = 0;
    let canEveryoneGo = true;
    for (const stone of copiedStones) {
      if (stone - mid <= 0) cntZero++;
      else cntZero = 0;

      if (cntZero === k) {
        canEveryoneGo = false;
        break;
      }
    }

    if (canEveryoneGo) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return max + 1;
}

const stones = [2, 4, 5, 3, 2, 1, 4, 2, 5, 1];
const k = 3;
solution(stones, k);
