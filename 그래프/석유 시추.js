function solution(land) {
  const N = land.length; // 땅의 세로 길이
  const M = land[0].length; // 땅의 가로 길이
  const visited = Array(N)
    .fill()
    .map(() => Array(M).fill(0));
  const oilInfo = {};

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (land[i][j] === 1 && !visited[i][j]) {
        visited[i][j] = 1;
        const [setC, cnt] = dfs([i, j]);

        setC.forEach(value => (oilInfo[value] ? (oilInfo[value] += cnt) : (oilInfo[value] = cnt)));
      }
    }
  }

  return Math.max(...Object.values(oilInfo));

  function dfs(coord) {
    const directions = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    const setC = new Set();
    const stack = [[...coord]];
    let cnt = 0;

    while (stack.length) {
      const [r, c] = stack.pop();
      setC.add(c);
      cnt += 1;

      for (const [dr, dc] of directions) {
        const [nr, nc] = [r + dr, c + dc];
        if (!checkRange(nr, nc)) continue;
        if (land[nr][nc] === 0 || visited[nr][nc]) continue;

        visited[nr][nc] = 1;
        stack.push([nr, nc]);
      }
    }

    return [setC, cnt];
  }

  function checkRange(r, c) {
    return 0 <= r && r < N && 0 <= c && c < M;
  }
}

const case1 = [
  [0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0],
  [1, 1, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 1, 1],
];

const case2 = [
  [1, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0],
  [1, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0],
  [1, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1],
];

console.log(solution(case1)); // 9
console.log(solution(case2)); // 16
