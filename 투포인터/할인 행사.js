function solution(want, number, discount) {
  const WANT_LENGTH = want.length;
  const DISCOUNT_LENGTH = discount.length;
  const DAY = 10;
  let answer = 0;

  const wantMap = new Map();
  for (let i = 0; i < WANT_LENGTH; i++) {
    wantMap.set(want[i], number[i]);
  }

  const discountMap = new Map();
  for (let i = 0; i < DAY; i++) {
    discountMap.set(discount[i], (discountMap.get(discount[i]) || 0) + 1);
  }
  if (canBuyEverything(wantMap, discountMap)) answer += 1;

  for (let i = 1; i <= DISCOUNT_LENGTH - DAY; i++) {
    const passedDiscount = discount[i - 1];
    const newDiscount = discount[i - 1 + DAY];

    discountMap
      .set(passedDiscount, discountMap.get(passedDiscount) - 1)
      .set(newDiscount, (discountMap.get(newDiscount) || 0) + 1);

    if (canBuyEverything(wantMap, discountMap)) answer += 1;
  }

  console.log(answer);
  // return answer
}

function canBuyEverything(wantMap, discountMap) {
  for (const [wantKey, wantValue] of wantMap) {
    if (!discountMap.has(wantKey) || discountMap.get(wantKey) < wantValue) return false;
  }

  return true;
}

const want = ["banana", "apple", "rice", "pork", "pot"];
const number = [3, 2, 2, 2, 1];
const discount = [
  "chicken",
  "apple",
  "apple",
  "banana",
  "rice",
  "apple",
  "pork",
  "banana",
  "pork",
  "rice",
  "pot",
  "banana",
  "apple",
  "banana",
];
solution(want, number, discount);
