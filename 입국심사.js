function solution(n, times) {
  let start = 0;
  let end = Math.ceil((Math.max(...times) * n) / times.length);
  let mid;

  let answer = Infinity;
  while (start <= end) {
    mid = start + Math.floor((end - start) / 2);

    let tmp = 0;
    for (let time of times) {
      tmp += Math.floor(mid / time);

      if (tmp >= n) {
        end = mid - 1;
        answer = Math.min(answer, mid);
        continue;
      }
    }

    if (tmp < n) {
      start = mid + 1;
    }
  }
  return answer;
}

solution(6, [2, 5]);
