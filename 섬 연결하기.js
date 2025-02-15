function find(parents, i) {
  if (parents[i] === i) return i;
  return (parents[i] = find(parents, parents[i]));
}

function union(parents, i1, i2) {
  const p1 = parents[i1];
  const p2 = parents[i2];

  if (p1 > p2) parents[p1] = p2;
  else parents[p2] = p1;
}

function hasSameParent(parents, i1, i2) {
  const p1 = find(parents, i1);
  const p2 = find(parents, i2);

  return p1 === p2;
}

function solution(n, costs) {
  let answer = 0;
  const parents = Array.from({ length: n }, (_, i) => i);
  costs.sort((a, b) => a[2] - b[2]);

  for (const cost of costs) {
    const [i1, i2, c] = cost;

    if (!hasSameParent(parents, i1, i2)) {
      answer += c;
      union(parents, i1, i2);
    }
  }

  console.log(answer);
  return answer;
}

const n = 4;
const costs = [
  [0, 1, 1],
  [0, 2, 2],
  [1, 2, 5],
  [1, 3, 1],
  [2, 3, 8],
];
solution(n, costs);
