function solution(triangle) {
  const height = triangle.length;
  triangle.reverse();

  const dp = Array(height)
    .fill()
    .map(() => []);
  dp[0].push(...triangle[0]);

  for (let i = 1; i < height; i++) {
    for (let j = 0; j < height - i; j++) {
      dp[i].push(triangle[i][j] + Math.max(dp[i - 1][j], dp[i - 1][j + 1]));
    }
  }

  return dp[height - 1][0];
}
