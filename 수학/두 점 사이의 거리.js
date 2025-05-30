function solution(r1, r2) {
  let answer = 0;

  for (let i = 1; i <= r2; i++) {
    let s = 0;
    if (i < r1) {
      s = Math.ceil(Math.sqrt(r1 ** 2 - i ** 2));
    }
    let e = Math.floor(Math.sqrt(r2 ** 2 - i ** 2));

    answer += e - s + 1;
  }

  return answer * 4;
}
