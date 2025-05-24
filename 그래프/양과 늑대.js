function solution(info, edges) {
  const visited = Array(info.length).fill(false);
  const answer = [];

  function dfs(sheep, wolf) {
    if (sheep > wolf) answer.push(sheep);
    else return;

    for (const [parent, child] of edges) {
      if (visited[parent] && !visited[child]) {
        visited[child] = true;
        if (info[child] === 0) dfs(sheep + 1, wolf);
        else dfs(sheep, wolf + 1);
        visited[child] = false;
      }
    }
  }

  visited[0] = true; // root 노드는 방문
  dfs(1, 0);

  return Math.max(...answer);
}

const info1 = [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1];
const edges1 = [
  [0, 1],
  [1, 2],
  [1, 4],
  [0, 8],
  [8, 7],
  [9, 10],
  [9, 11],
  [4, 3],
  [6, 5],
  [4, 6],
  [8, 9],
];
const res1 = solution(info1, edges1);
console.log(res1);

const info2 = [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0];
const edges2 = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
  [3, 7],
  [4, 8],
  [6, 9],
  [9, 10],
];
const res2 = solution(info2, edges2);
console.log(res2);
