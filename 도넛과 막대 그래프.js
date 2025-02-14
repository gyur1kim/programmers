function solution(edges) {
  let answer = Array(4).fill(0);

  const graph = new Map();
  const inSet = new Set();
  let maxNode = 0;

  for (const [u, v] of edges) {
    graph.set(u, graph.has(u) ? [...graph.get(u), v] : [v]);
    maxNode = Math.max(maxNode, u, v);
    inSet.add(v);
  }

  // 무관한 노드 찾기 (=> 얘한테 향하는 간선이 없음)
  for (const [key, value] of graph) {
    if (!inSet.has(key) && value.length >= 2) {
      answer[0] = key;
      break;
    }
  }

  const visited = Array(maxNode).fill(false);
  visited[answer[0]] = true;
  function countGraph(i) {
    const ROOT = i;
    const stack = [ROOT];
    visited[i] = true;

    let nodes = 0;
    let edges = 0;
    let isDoughnut = false;

    while (stack.length) {
      const i = stack.pop();
      nodes += 1;

      const nexts = graph.get(i);
      if (!nexts) break;

      edges += nexts.length;
      for (const next of nexts) {
        if (visited[next]) {
          if (next === ROOT) isDoughnut = true;
          continue;
        }

        stack.push(next);
        visited[next] = true;
      }
    }

    if (nodes === edges && isDoughnut) answer[1] += 1;
    else if (nodes === edges + 1) answer[2] += 1;
    else if (nodes === edges - 1) answer[3] += 1;
  }

  for (let i = 1; i <= maxNode; i++) {
    if (visited[i]) continue;
    if (!graph.has(i) && !inSet.has(i)) continue;

    countGraph(i);
  }

  return answer;
}
