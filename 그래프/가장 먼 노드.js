function solution(n, edge) {
  const graph = Array(n + 1)
    .fill()
    .map(() => new Set());

  for (const e of edge) {
    const [from, to] = e;
    graph[from].add(to);
    graph[to].add(from);
  }

  // bfs를 진행, visited 관리..
  // prevStack, stack, nextStack으로 관리하면 되지 않을까?

  // 1회차: prevStack: [], stack : [1], nextStack: [2, 3]
  // 2회차: prevStack: [1], stack: [2, 3], nextStack: [4, 5, 6]
  // 3회차: prevStack: [2, 3], stack: [4, 5, 6], nextStack: []
  // 4회차: prevStack: [4, 5, 6], stack: [] stack이 비었으므로 종료.

  const visited = Array(n + 1).fill(false);
  visited[1] = true;

  let prevStack = [];
  let stack = [];
  let nextStack = [1];

  while (nextStack.length) {
    stack = [...nextStack];
    prevStack = [...stack];
    nextStack = [];

    while (stack.length) {
      const node = stack.pop();

      for (const next of graph[node]) {
        if (visited[next]) continue;

        nextStack.push(next);
        visited[next] = true;
      }
    }
  }

  return prevStack.length;
}
