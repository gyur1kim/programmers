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

  // 하나씩 루트를 설정해보자
  for (const root of nodes) {
    // root랑 자식들의 개수랑 홀짝여부가 같으면 isOddEven을 true로
    let isOddEven = false;
    if (checkIsOddEven(root, forest[root])) isOddEven = true;

    const res = traverse(root, -1, isOddEven);
    if (res) isOddEven ? (answer[0] += 1) : (answer[1] += 1);
  }

  return answer;

  function checkIsOddEven(root, childSet) {
    return root % 2 === childSet.size % 2;
  }

  function traverse(root, parent, isOddEven) {
    const stack = [[root, parent]];

    while (stack.length) {
      const [node, parent] = stack.pop();
      const childs = new Set([...forest[node]]);
      childs.delete(parent);

      if (checkIsOddEven(node, childs) !== isOddEven) return false;

      childs.forEach(child => {
        stack.push([child, node]);
      });
    }

    return true;
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
