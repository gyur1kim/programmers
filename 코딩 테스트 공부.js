function solution(alp, cop, problems) {
  const MAX_ALP = Math.max(alp, ...problems.map(problem => problem[0]));
  const MAX_COP = Math.max(cop, ...problems.map(problem => problem[1]));

  // 행은 알고력, 열은 코딩력
  // DP[i][j]에서 알고력 i와 코딩력 j가 필요한 문제를 풀기 위한 최단시간을 저장함.
  const DP = Array(MAX_ALP + 1)
    .fill()
    .map(() => Array(MAX_COP + 1).fill(Infinity));

  alp = Math.min(alp, MAX_ALP);
  cop = Math.min(cop, MAX_COP);
  DP[alp][cop] = 0;

  for (let i = alp; i <= MAX_ALP; i++) {
    for (let j = cop; j <= MAX_COP; j++) {
      // 알고력을 1 늘려보자
      if (i !== MAX_ALP) DP[i + 1][j] = Math.min(DP[i][j] + 1, DP[i + 1][j]);

      // 코딩력을 1 늘려보자
      if (j !== MAX_COP) DP[i][j + 1] = Math.min(DP[i][j] + 1, DP[i][j + 1]);

      for (const [alpReq, copReq, alpRwd, copRwd, cost] of problems) {
        // 이 문제를 풀어서 힘을 늘릴거잖아.
        if (alpReq <= i && copReq <= j) {
          const newAlp = Math.min(i + alpRwd, MAX_ALP);
          const newCop = Math.min(j + copRwd, MAX_COP);

          DP[newAlp][newCop] = Math.min(DP[newAlp][newCop], DP[i][j] + cost);
        }
      }
    }
  }

  return DP[MAX_ALP][MAX_COP];
}
