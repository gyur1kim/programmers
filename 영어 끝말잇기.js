function calcAnswer(i, n) {
  const person = (i + 1) % n || n;
  const round = Math.ceil((i + 1) / n);
  return [person, round];
}
function solution(n, words) {
  const usedWordsMap = new Map();
  let beforeWord = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // 1. 앞에서 나왔던 글자의 마지막 글자와, 현재 글자의 첫번째가 같은지?
    const beforeWordLastChar = beforeWord.slice(-1);
    const currentWordFirstChar = word.slice(0, 1);

    if (beforeWordLastChar !== currentWordFirstChar && i !== 0)
      return calcAnswer(i, n);

    // 2. 나온 적 없는 글자인지?
    if (usedWordsMap.has(word)) return calcAnswer(i, n);

    usedWordsMap.set(word, true);
    beforeWord = word;
  }

  return [0, 0];
}
