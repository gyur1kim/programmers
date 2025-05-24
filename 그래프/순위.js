function solution(n, results) {
  const weakerList = Array(n + 1)
    .fill()
    .map(() => new Set());
  const strongerList = Array(n + 1)
    .fill()
    .map(() => new Set());

  for (const [win, lose] of results) {
    weakerList[win].add(lose); // i보다 약한 놈들을 넣음 (=> i가 이겼다)
    strongerList[lose].add(win); // i보다 쎈 애들을 넣음 (=> i가 졌다)
  }

  for (let i = 1; i <= n; i++) {
    // i보다 쎈 애들은
    for (const winner of [...strongerList[i]]) {
      // i보다 약한 애들 이김
      for (const loser of [...weakerList[i]]) {
        weakerList[winner].add(loser);
      }
    }
    // i보다 약한 넘들은
    for (const loser of [...weakerList[i]]) {
      // i보다 쎈 애들한테 짐
      for (const winner of [...strongerList[i]]) {
        strongerList[loser].add(winner);
      }
    }
  }

  let answer = 0;
  for (let i = 1; i <= n; i++) {
    // 본인 제외 n-1개의 크기를 가지면 정확한 등수를 알 수 있음
    if (weakerList[i].size + strongerList[i].size === n - 1) answer++;
  }

  return answer;
}
