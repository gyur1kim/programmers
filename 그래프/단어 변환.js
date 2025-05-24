function canChangeWord(word1, word2) {
  const LENGTH = word1.length;
  let cntDifference = 0;

  for (let i = 0; i < LENGTH; i++) {
    if (word1[i] !== word2[i]) cntDifference += 1;
    if (cntDifference > 1) return false;
  }

  return true;
}

function dfs(begin, target, answer, words, cnt, visited) {
  if (begin === target) return Math.min(answer, cnt);

  const LENGTH = words.length;
  let result = answer;
  for (let idx = 0; idx < LENGTH; idx++) {
    if (visited[idx]) continue;

    const word = words[idx];
    if (canChangeWord(begin, word)) {
      visited[idx] = true;
      result = dfs(word, target, result, words, cnt + 1, visited);
      visited[idx] = false;
    }
  }

  return result;
}

function solution(begin, target, words) {
  let answer = Infinity;

  const visited = Array(words.length).fill(false);
  answer = dfs(begin, target, answer, words, 0, visited);
  return answer === Infinity ? 0 : answer;
}
