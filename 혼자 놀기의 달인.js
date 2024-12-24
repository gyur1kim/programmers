function solution(cards) {
  let answer = 0;

  function openBox(idx, visited, sum) {
    const card = visited[idx];

    // 이미 열어본 박스면 끗
    if (card === null) return sum;

    // 안열어봤으면 다시 고고
    visited[idx] = null;
    return openBox(card - 1, visited, sum + 1);
  }

  for (let idx1 = 0; idx1 < cards.length; idx1++) {
    const visited = [...cards];
    const result1 = openBox(idx1, visited, 0);

    for (let idx2 = idx1 + 1; idx2 < cards.length; idx2++) {
      const result2 = openBox(idx2, visited, 0);

      if (result1 * result2 > answer) answer = result1 * result2;
    }
  }

  return answer;
}

const input = [8, 6, 3, 7, 2, 5, 1, 4];
console.log(solution(input));
