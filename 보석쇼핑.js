function solution(gems) {
  const CNT_GEMS = new Set(gems).size;
  const gemMap = new Map();
  gemMap.set(gems[0], 1);

  let answer = [1, gems.length];
  let l = 0,
    r = 0;

  while (r < gems.length) {
    if (gemMap.size === CNT_GEMS) {
      if (answer[1] - answer[0] > r - l) answer = [l + 1, r + 1];

      // l을 하나 늘리자
      const removeGem = gems[l];
      gemMap.set(removeGem, gemMap.get(removeGem) - 1);
      if (gemMap.get(removeGem) === 0) gemMap.delete(removeGem);
      l += 1;
    } else {
      r += 1;
      gemMap.set(gems[r], (gemMap.get(gems[r]) || 0) + 1);
    }
  }

  return answer;
}
