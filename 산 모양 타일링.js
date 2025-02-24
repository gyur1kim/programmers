function solution(n, tops) {
  const MOD = 10_007;
  // 삼각으로 끝나는 경우, 마름모로 끝나는 경우
  const DP = [[1, 0]];

  for (let i = 1; i <= n; i++) {
    // top이 있는 경우
    if (tops[i - 1]) {
      DP[i] = [(DP[i - 1][0] * 3 + DP[i - 1][1] * 2) % MOD, (DP[i - 1][0] + DP[i - 1][1]) % MOD];
    } else {
      DP[i] = [(DP[i - 1][0] * 2 + DP[i - 1][1]) % MOD, (DP[i - 1][0] + DP[i - 1][1]) % MOD];
    }
  }

  return (DP[n][0] + DP[n][1]) % MOD;
}
