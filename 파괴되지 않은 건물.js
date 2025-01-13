function solution(board, skills) {
  const N = board.length;
  const M = board[0].length;
  let answer = 0;

  const skillBoard = Array(N + 2)
    .fill()
    .map(() => Array(M + 2).fill(0));

  for (const skill of skills) {
    // type 1은 공격, 2는 회복
    const [type, r1, c1, r2, c2, degree] = skill;
    const skillDegree = degree * (type === 1 ? -1 : 1);

    skillBoard[r1 + 1][c1 + 1] += skillDegree;
    skillBoard[r2 + 2][c2 + 2] += skillDegree;

    skillBoard[r1 + 1][c2 + 2] -= skillDegree;
    skillBoard[r2 + 2][c1 + 1] -= skillDegree;
  }

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      skillBoard[i][j] += skillBoard[i - 1][j] + skillBoard[i][j - 1] - skillBoard[i - 1][j - 1];
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] + skillBoard[i + 1][j + 1] > 0) answer++;
    }
  }

  return answer;
}
