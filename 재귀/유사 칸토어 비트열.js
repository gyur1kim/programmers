function solution(n, l, r) {
  let answer = 0;

  function recursion(n, l, r) {
    // 11011
    if (n === 1) {
      answer += [1, 1, 0, 1, 1].slice(l, r + 1).reduce((acc, cur) => acc + cur, 0);
      return;
    }

    const section = Math.floor(l / 5 ** (n - 1));
    const idx = l % 5 ** (n - 1);

    const endSection = Math.floor(r / 5 ** (n - 1));
    const endIdx = r % 5 ** (n - 1);

    if (section === endSection) return recursion(n - 1, idx, endIdx);

    for (let s = section; s <= endSection; s++) {
      if (s === 2) continue; // '00000' 구간
      if (s === section) {
        // 다시 여길 5개로 쪼개봐.
        recursion(n - 1, idx, 5 ** (n - 1) - 1);
      } else if (s === endSection) {
        // 여기도 쪼개서 endIdx로 구해봐
        recursion(n - 1, 0, endIdx);
      } else {
        // 가운데 부분이면 그냥 answer에 더해
        answer += 4 ** (n - 1);
      }
    }
  }

  if (n === 0) return 1;

  recursion(n, l - 1, r - 1);

  return answer;
}

solution(3, 1, 10);
