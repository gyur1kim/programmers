function solution(coin, cards) {
  let answer = 0;
  const n = cards.length;

  const myCard = new Set();
  const drawCard = new Set();

  for (let i = 0; i < n / 3; i++) {
    myCard.add(cards[i]);
  }

  let currentIdx = n / 3;
  while (true) {
    // 더이상 뽑을 카드가 없엉
    if (currentIdx > n) break;

    answer += 1;
    cards.slice(currentIdx, currentIdx + 2).map(card => drawCard.add(card));
    currentIdx += 2;

    let nextRound = false;

    // 뽑은 카드만으로 가능한쥐
    for (const card of myCard) {
      if (myCard.has(n + 1 - card)) {
        myCard.delete(card);
        myCard.delete(n + 1 - card);
        nextRound = true;
        break;
      }
    }
    if (nextRound) continue;

    // 내가 뽑은 카드 + 후보군? 조합으로 가능한쥐
    if (coin >= 1) {
      for (const card of myCard) {
        if (drawCard.has(n + 1 - card)) {
          myCard.delete(card);
          drawCard.delete(n + 1 - card);
          coin -= 1;
          nextRound = true;
          break;
        }
      }
    }
    if (nextRound) continue;

    // 후보군? 조합만으로 가능한지
    if (coin >= 2) {
      for (const card of drawCard) {
        if (drawCard.has(n + 1 - card)) {
          drawCard.delete(card);
          drawCard.delete(n + 1 - card);
          coin -= 2;
          nextRound = true;
          break;
        }
      }
    }

    // 셋 다 안되면,, while문 끝내
    if (!nextRound) break;
  }

  return answer;
}
