/**
알고력 : 알고리즘에 대한 지식
코딩력 : 코드를 구현하는 능력

알고력/코딩력을 높이는 법
- 알고리즘 공부 1의 시간 -> 알고력 1 높아짐
- 코딩 공부 1의 시간 -> 코딩력 1 높아짐
- 풀 수 있는 문제를 풀어 알고력, 코딩을 높임 (cost, rwd)
- 같은 문제를 여러 번 푸는 것 가능

모든 문제를 풀 수 있는 알고력과 코딩력을 얻는 최단 시간은?

알고 파워 alp
코딩 파워 cop
problems: [[요구되는 알고력, 요구되는 코딩력, 알고력 리워드, 코딩력 리워드, 드는 시간]]
*/

function solution(alp, cop, problems) {
  let maxReqAlp, maxReqCop;

  maxReqAlp = Math.max(...problems.map(p => p[0]));
  maxReqCop = Math.max(...problems.map(p => p[1]));

  const dp = Array(maxReqAlp + 1)
    .fill()
    .map(() => Array(maxReqCop + 1).fill(Infinity));

  alp = Math.min(alp, maxReqAlp);
  cop = Math.min(cop, maxReqCop);

  dp[alp][cop] = 0;

  for (let i = alp; i <= maxReqAlp; i++) {
    for (let j = cop; j <= maxReqCop; j++) {
      // 기존값 or "공부"를 해서 힘 늘리기 둘 중에 더 적은 시간이 소요되는 것
      if (i < maxReqAlp) dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
      if (j < maxReqCop) dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);

      // 다 공부했으면 땡이요~
      if (i === maxReqAlp && j === maxReqCop) break;

      for (const [reqAlp, reqCop, rwdAlp, rwdCop, cost] of problems) {
        // 내가 풀 수 있는 문제면
        if (i >= reqAlp && j >= reqCop) {
          // 현재 알고력 i, 코딩력 j인데
          // 이 문제를 풀면 reward를 가짐
          const newAlp = Math.min(i + rwdAlp, maxReqAlp);
          const newCop = Math.min(j + rwdCop, maxReqCop);
          // 이 문제를 풀고 cost를 받는게 낫냐, 아니면 이 문제 안푸는게 낫냐?
          dp[newAlp][newCop] = Math.min(dp[newAlp][newCop], dp[i][j] + cost);
        }
      }
    }
  }
  return dp[maxReqAlp][maxReqCop];
}
