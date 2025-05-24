/**
 * 후보키는 다음과 같은 성질을 만족해야 함
 *
 * - 유일성 : 릴레이션의 튜플에 대해 유일하게 식별돼야 함
 * - 최소성 : 꼭 필요한 속성들로만 구성돼야 함. 하나라도 속성이 제거되면 유일성이 깨짐(식별할 수 없음)
 *    ex) [이름]만으로는 식별할 수 없지만, [이름, 전공]을 사용하면 식별이 가능해짐
 *        [이름, 전공, 학년]도 되지만, 학년을 제거해도 유일성이 깨지지 않음
 *
 * 그럼 일단
 * 1개 ~ 식별자인지 확인
 * 2개(1개에서 걸러진 식별자 빼고) ~ 식별자인지 확인
 * 3개(2개에서 걸러진 식별자 빼고) ~ 식별자인지 확인
 * ....
 *
 * 조합을 해봐야할 것 같다.
 */

function solution(relation) {
  const countAttribute = relation[0].length; // 속성 개수
  const candidateKey = []; // 후보키의 index를 담자

  for (let d = 1; d <= countAttribute; d++) {
    combination(0, d, [], 0);
  }

  // 최소성 검사
  function checkMinimality(array) {
    const testSet = new Set(array);
    for (const key of candidateKey) {
      if ([...key].every((element) => testSet.has(element))) return false;
    }
    return true;
  }

  // 유일성 검사
  function isUnique(array) {
    let map = new Set(array);
    if (map.size === relation.length) return true;
    return false;
  }

  function makeCandidateKey(array) {
    const testKey = relation.map((tuple) =>
      array.map((idx) => tuple[idx]).join("")
    );

    // 여기 push할 때 그냥 array를 넣으면,,, combination처음 실행할 때 생성했던 array의 주소가 넣어짐
    // 그래서 계속 candidateKey안의 원소 값이 바뀌고 사라지고 그랬음;;
    // 얕은복사로 넣어야 함
    if (isUnique(testKey)) candidateKey.push([...array]);
  }

  // 조합 생성
  function combination(currentDepth, targetDepth, tmpArray, index) {
    if (currentDepth === targetDepth) {
      // 내가 원하는 개수만큼 다 만들면 후보키로 만들어봐
      if (checkMinimality(tmpArray)) {
        makeCandidateKey(tmpArray);
      }
      return;
    }

    for (let i = index; i < countAttribute; i++) {
      tmpArray.push(i);
      combination(currentDepth + 1, targetDepth, tmpArray, i + 1);
      tmpArray.pop();
    }
  }

  return candidateKey.length;
}

const input = [
  ["100", "ryan", "music", "2"],
  ["200", "apeach", "math", "2"],
  ["300", "tube", "computer", "3"],
  ["400", "con", "computer", "4"],
  ["500", "muzi", "music", "3"],
  ["600", "apeach", "music", "2"],
];

solution(input);
