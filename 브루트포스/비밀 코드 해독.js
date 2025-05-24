function checkCode(arr, q, ans) {
  for (let i = 0; i < q.length; i++) {
    const guessArr = q[i];
    const guessRes = guessArr.filter(num => arr.includes(num));

    if (guessRes.length !== ans[i]) return false;
  }

  return true;
}

function solution(n, q, ans) {
  //30*29*28*27*26 = 17100720
  let answer = 0;

  for (let a = 1; a <= n; a++) {
    for (let b = a + 1; b <= n; b++) {
      for (let c = b + 1; c <= n; c++) {
        for (let d = c + 1; d <= n; d++) {
          for (let e = d + 1; e <= n; e++) {
            if (checkCode([a, b, c, d, e], q, ans)) answer += 1;
          }
        }
      }
    }
  }

  return answer;
}
