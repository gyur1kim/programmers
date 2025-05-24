function solution(m, n, puddles) {
  const MOD = 1_000_000_007;
  const visited = Array(n)
    .fill()
    .map(() => Array(m).fill(0));
  visited[0][0] = 1;

  for (const puddle of puddles) {
    const [c, r] = puddle;
    visited[r - 1][c - 1] = null;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i === 0 && j === 0) continue;
      if (visited[i][j] === null) continue;

      const left = j - 1 >= 0 ? visited[i][j - 1] ?? 0 : 0;
      const top = i - 1 >= 0 ? visited[i - 1][j] ?? 0 : 0;
      visited[i][j] = (left + top) % MOD;
    }
  }

  return visited[n - 1][m - 1];
}
