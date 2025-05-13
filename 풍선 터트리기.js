function solution(a) {
  let answer = 2; // 양 쪽 가장 끝 풍선을 고르면 그것은 true

  // dp[i][0] = 10   i번 풍선 기준으로 왼쪽(0) 최소값은 10임
  // dp[i][1] = -92  i번 풍선 기준으로 오른쪽(1) 최소값은 -92임
  const dp = Array(a.length)
    .fill()
    .map(() => Array(2).fill(0));
  dp[0][0] = a[0];
  dp[a.length - 1][1] = a.at(-1);

  // 최솟값 dp를 미리 채워놔
  for (let i = 1; i < a.length; i++) {
    dp[i][0] = Math.min(dp[i - 1][0], a[i]);
  }
  for (let i = a.length - 2; i >= 0; i--) {
    dp[i][1] = Math.min(dp[i + 1][1], a[i]);
  }

  for (let i = 1; i < a.length - 1; i++) {
    const balloon = a[i];
    const leftMin = dp[i - 1][0];
    const rightMin = dp[i + 1][1];

    // 둘 다 balloon보다 작으면,
    // "번호가 더 작은 풍선을 터트리는 행위는 최대 1번만 할 수 있습니다."
    // 라는 조건을 위배하게 된당
    if (leftMin < balloon && rightMin < balloon) continue;

    answer += 1;
  }

  return answer;
}
