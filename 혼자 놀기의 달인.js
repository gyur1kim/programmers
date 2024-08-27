function solution(cards) {
  function openBox(cardIdx, opendCards, opendCnt) {
    let nextCardIdx = opendCards[cardIdx] - 1;
    opendCnt += 1;
    opendCards[cardIdx] = null;

    if (opendCards[nextCardIdx] === null) {
      return opendCnt;
    }
    return openBox(nextCardIdx, opendCards, opendCnt);
  }

  let answer = 0;

  for (let cardIdx = 0; cardIdx < cards.length; cardIdx++) {
    let opendBoxes = [...cards];
    let firstGroupResult = openBox(cardIdx, opendBoxes, 0);

    for (let cardIdx2 = cardIdx + 1; cardIdx2 < cards.length; cardIdx2++) {
      if (opendBoxes[cardIdx2]) {
        let secondGroupResult = openBox(cardIdx2, opendBoxes, 0);
        if (firstGroupResult * secondGroupResult > answer)
          answer = firstGroupResult * secondGroupResult;
      }
    }
  }

  return answer;
}
