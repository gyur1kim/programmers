function solution(nodes, edges) {
  const answer = [0, 0]; // 홀짝, 역홀짝

  const forest = {};
  for (const node of nodes) {
    forest[node] = new Set();
  }
  for (const [v, w] of edges) {
    forest[v].add(w);
    forest[w].add(v);
  }

  const visited = new Set();
  // 하나씩 루트를 설정해보자
  for (const root of nodes) {
    if (visited.has(root)) continue;

    visited.add(root);
    const cntEvenOdd = makeTree(root);

    if (cntEvenOdd[0] === 1) answer[0] += 1;
    if (cntEvenOdd[1] === 1) answer[1] += 1;
  }

  return answer;

  function checkIsOddEven(root, childSet) {
    return root % 2 === childSet.size % 2;
  }

  function makeTree(root) {
    const stack = [root];
    const cntEvenOdd = [0, 0]; // [홀짝 개수, 역홀짝 개수]

    while (stack.length) {
      const node = stack.pop();
      const childs = forest[node];

      checkIsOddEven(node, childs) ? (cntEvenOdd[0] += 1) : (cntEvenOdd[1] += 1);

      childs.forEach(child => {
        if (!visited.has(child)) {
          stack.push(child);
          visited.add(child);
        }
      });
    }

    return cntEvenOdd;
  }
}

const nodes1 = [11, 9, 3, 2, 4, 6];
const edges1 = [
  [9, 11],
  [2, 3],
  [6, 3],
  [3, 4],
];
console.log(solution(nodes1, edges1)); // [1, 0]

const nodes2 = [9, 15, 14, 7, 6, 1, 2, 4, 5, 11, 8, 10];
const edges2 = [
  [5, 14],
  [1, 4],
  [9, 11],
  [2, 15],
  [2, 5],
  [9, 7],
  [8, 1],
  [6, 4],
];
console.log(solution(nodes2, edges2)); // [2, 1]
