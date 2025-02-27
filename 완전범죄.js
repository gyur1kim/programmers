function solution(infos, n, m) {
  const LENGTH = infos.length;
  const DP = Array(LENGTH + 1)
    .fill()
    .map(() => Array(m).fill(Infinity));
  DP[0][0] = 0; // 아무것도 안훔치면 0이죠

  for (let i = 1; i <= LENGTH; i++) {
    const [a, b] = infos[i - 1];

    // b의 흔적이 얼마인지에 따라 a의 흔적의 최소값을 업데이트합쉬다.
    for (let c = 0; c < m; c++) {
      // a를 훔쳐
      DP[i][c] = Math.min(DP[i][c], DP[i - 1][c] + a);

      // b를 훔쳐
      if (c + b < m) {
        DP[i][c + b] = Math.min(DP[i - 1][c], DP[i][c + b]);
      }
    }
  }

  const answer = Math.min(...DP[LENGTH]);
  return answer >= n ? -1 : answer;
}
