function solution(n, s) {
  if (Math.floor(s / n) < 1) return [-1];

  const answer = Array.from({ length: n }, () => Math.floor(s / n));

  if (s % n) {
    let idx = n - 1;
    for (let i = 0; i < s % n; i++) {
      answer[idx] += 1;
      idx--;
    }
  }

  return answer;
}
