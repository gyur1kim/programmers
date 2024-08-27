function solution(cards) {
  function openBox(cardIdx, opendCards, opendCnt) {
    // 현재 idx의 박스를 까봐. (다음에 깔 박스의 idx임)
    let nextCardIdx = opendCards[cardIdx] - 1;

    // 박스를 깠으니 개수를 하나 늘려
    opendCnt += 1;

    // 현재 박스를 깠으니 null처리 해줘
    opendCards[cardIdx] = null;

    // 다음으로 열어야하는 박스가 null값이면 이제 이 함수를 끝내
    if (opendCards[nextCardIdx] === null) {
      return opendCnt;
    }
    // 그게 아니면 그 박스에 있는 카드의 번호를 다시 열어
    return openBox(nextCardIdx, opendCards, opendCnt);
  }

  let answer = 0;
  // 1번부터 cards의 길이까지 까본다.
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
