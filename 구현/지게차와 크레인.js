function solution(storage, requests) {
  storage = storage.map(s => s.split(""));
  const n = storage.length;
  const m = storage[0].length;
  const allOutSet = new Set(); // 이미 다 제거한 컨테이너면 실행X하려구..

  let answer = n * m;

  for (const request of requests) {
    if (allOutSet.has(request[0])) continue;

    if (request.length === 1) {
      const containerCoord = [];
      let noContainerFlag = true;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (storage[i][j] !== request) continue;

          noContainerFlag = false;
          const res = checkIsBoundary(storage, i, j);
          if (res) containerCoord.push([...res]);
        }
      }

      if (noContainerFlag) allOutSet.add(request);

      for (const [i, j] of containerCoord) {
        storage[i][j] = -1;
      }
      answer -= containerCoord.length;
    } else {
      const res = getOutAll(storage, request[0]);
      answer -= res;
      allOutSet.add(request[0]);
    }
  }

  return answer;

  function checkIsBoundary(storage, i, j) {
    const stack = [[i, j]];
    const directions = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    const visited = Array(n)
      .fill()
      .map(() => Array(m).fill(false));
    visited[i][j] = true;

    while (stack.length) {
      const [r, c] = stack.pop();
      for (const [dr, dc] of directions) {
        const [nr, nc] = [r + dr, c + dc];

        // 영역 밖 -> 경계에 있는 컨테이너임
        if (nr < 0 || nr >= n || nc < 0 || nc >= m) {
          return [i, j];
        }

        if (!visited[nr][nc] && storage[nr][nc] === -1) {
          stack.push([nr, nc]);
          visited[nr][nc] = true;
        }
      }
    }

    return false;
  }

  function getOutAll(storage, request) {
    let cnt = 0;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (request === storage[i][j]) {
          storage[i][j] = -1;
          cnt += 1;
        }
      }
    }

    return cnt;
  }
}

const storage1 = ["HAH", "HBH", "HHH", "HAH", "HBH"];
const requests1 = ["C", "B", "B", "B", "B", "H"];
console.log(solution(storage1, requests1));
