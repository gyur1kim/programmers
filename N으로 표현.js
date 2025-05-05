function solution(N, number) {
  const DP = Array(9)
    .fill()
    .map(() => new Set());

  if (N === number) return 1;

  for (var i = 1; i <= 8; i++) {
    console.log(DP);
    DP[i].add(Number(String(N).repeat(i)));

    for (var j = 1; j < i; j++) {
      for (var first of DP[j]) {
        for (var second of DP[i - j]) {
          if (first <= 0 || second <= 0) continue;
          console.log(first, second);
          DP[i].add(first + second);
          DP[i].add(first - second);
          DP[i].add(first * second);
          DP[i].add(Math.floor(first / second));
        }
      }
    }
    if (DP[i].has(number)) return i;
  }

  return -1;
}

console.log(solution(5, 12));
console.log(solution(2, 11));
