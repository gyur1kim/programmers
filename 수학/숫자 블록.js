function solution(begin, end) {
  const LENGTH = end - begin + 1;
  const MAX_BLOCK = 10_000_000;
  const answer = Array(end - begin + 1).fill(1);

  for (let i = 0; i < LENGTH; i++) {
    const n = begin + i;
    if (n === 1) {
      answer[i] = 0;
      continue;
    }

    // n의 최대공약수를 구한다
    for (let j = 2; j <= Math.sqrt(n); j++) {
      if (n % j === 0) {
        if (n / j <= MAX_BLOCK) {
          answer[i] = n / j;
          break;
        }
        answer[i] = j; // 이 값이 천만보다 크면 일단 임시로
      }
    }
  }

  return answer;
}
