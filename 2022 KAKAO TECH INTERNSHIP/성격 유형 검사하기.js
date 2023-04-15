// function calcTestScore(category, score) {
//   switch (score) {
//     case 1: return { [category[0]]: 3, [category[1]]: 0 };
//     case 2: return { [category[0]]: 2, [category[1]]: 0 };
//     case 3: return { [category[0]]: 1, [category[1]]: 0 };
//     case 4: return { [category[0]]: 0, [category[1]]: 0 };
//     case 5: return { [category[0]]: 0, [category[1]]: 1 };
//     case 6: return { [category[0]]: 0, [category[1]]: 2 };
//     case 7: return { [category[0]]: 0, [category[1]]: 3 };
//   }
// }
//
// function solution(survey, choices) {
//   let answer = '';
//   const testRes = [
//     { R: 0, T: 0 },
//     { C: 0, F: 0 },
//     { J: 0, M: 0 },
//     { A: 0, N: 0 }
//   ]
//
//   for (let i=0; i<survey.length; i++){
//     let category = survey[i];
//     let score = choices[i];
//     let calcRes = calcTestScore(category, score);
//     console.log(category, score, calcRes);
//     switch(category) {
//       case 'RT':
//       case 'TR':
//         testRes[0] = { R: testRes[0].R + calcRes.R, T: testRes[0].T + calcRes.T }
//         break;
//       case 'CF':
//       case 'FC':
//         testRes[1] = { C: testRes[1].C + calcRes.C, F: testRes[1].F + calcRes.F }
//         break;
//       case 'JM':
//       case 'MJ':
//         testRes[2] = { J: testRes[2].J + calcRes.J, M: testRes[2].M + calcRes.M }
//         break;
//       case 'AN':
//       case 'NA':
//         testRes[3] = { A: testRes[3].A + calcRes.A, N: testRes[3].N + calcRes.N }
//         break;
//     }
//   }
//   for (const categories of testRes) {
//     let [first, second] = Object.keys(categories);
//     answer += categories[first] >= categories[second] ? first : second;
//   }
//   return answer;
// }
//
// console.log(solution(["TR", "RT", "TR"], [7, 1, 3]));


/*
 * 이렇게 복잡하게 생각하지 않아도 됐다...
 * 입력값 처리하는 일을 너무 복잡하게 생각한듯..!!
 */

function solution(survey, choices) {
  const MBTI = {};
  const types = ["RT","CF","JM","AN"];

  // MBTI Object를 만들건데, type 글자를 하나하나 쪼개 동적으로 만들 것이다.
  types.forEach((type) =>
    type.split('').forEach((char) => MBTI[char] = 0)
  )

  // 내가 선택한 점수를 가지고 할당할 것이다
  // 문자열도 구조 분해 할당이 되는 줄 몰랐다
  choices.forEach((choice, index) => {
    const [disagree, agree] = survey[index];
    MBTI[choice > 4 ? agree : disagree] += Math.abs(choice - 4);
  });

  // 다시 구조 분해 할당을 통해 더 큰 값을 얻은 성격 유형을 골라 출력
  return types.map(([a, b]) => MBTI[b] > MBTI[a] ? b : a).join("");
}

console.log(solution(["TR", "RT", "TR"], [7, 1, 3]));