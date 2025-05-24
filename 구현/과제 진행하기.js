/**
 * 과제는 시작하기로 한 시각이 되면 시작합니다.
 *
 * 새로운 과제를 시작할 시각이 되었을 때, 기존에 진행 중이던 과제가 있다면 진행 중이던 과제를 멈추고 새로운 과제를 시작합니다.
 *
 * 진행중이던 과제를 끝냈을 때, 잠시 멈춘 과제가 있다면, 멈춰둔 과제를 이어서 진행합니다.
 *
 * 만약, 과제를 끝낸 시각에 새로 시작해야 되는 과제와 잠시 멈춰둔 과제가 모두 있다면, 새로 시작해야 하는 과제부터 진행합니다.
 *
 * 멈춰둔 과제가 여러 개일 경우, 가장 최근에 멈춘 과제부터 시작합니다.
 *
 * @param {*} plans : [과제이름, 시작시간, 과제진행시간] 형식의 2차원 배열
 * @returns 과제를 빨리 끝낸 순서대로 이름을 저장한 배열
 */

function solution(plans) {
  // 시간 형식 변환 -> 정렬
  plans = plans
    .map(plan => {
      const newTime = convertTimeToMin(plan[1]);
      return [plan[0], newTime, plan[2]];
    })
    .sort((a, b) => a[1] - b[1]);

  const answer = []; // 끝난 과목을 저장할 배열
  const stopped = []; // 중간에 멈춘 과제들을 저장할 배열
  let [name, start, playtime] = plans[0]; // 현재 과제 정보 저장

  for (let i = 1; i < plans.length; i++) {
    // 다음 과제
    const [newName, newStart, newPlaytime] = plans[i];

    /** 현재 과제와 다음 과제의 시간차이 */
    let timeGap = newStart - start;

    // 현재 과목을 공부할 시간이 모자라면,,, 멈추는 배열에 저장하고 다음 과목을 공부하자
    if (timeGap < playtime) stopped.push([name, playtime - timeGap]);
    // 현재 과제 딱 끝내고 다음 과제 진행할 수 있음
    else if (timeGap === playtime) answer.push(name);
    // 현재 과제를 끝내도 시간이 남으면 기존에 멈춰둔 과제를 진행하면 됨
    else {
      answer.push(name);
      timeGap -= playtime;

      while (true) {
        const beforeStopped = stopped.pop();

        // 멈춰둔 과제가 없으면 다음 과제를 합시다.
        if (!beforeStopped) break;

        const [stoppedName, stoppedPlaytime] = beforeStopped;

        // 남은 과제 풀어도 시간이 남음!
        if (timeGap > stoppedPlaytime) {
          answer.push(stoppedName);
          timeGap -= stoppedPlaytime;
        }
        // 남은 과제 푸니까 딱 시간이 끝남!
        else if (timeGap === stoppedPlaytime) {
          answer.push(stoppedName);
          break;
        }
        // 아직 과제 남았는데 시간이 끝남
        else {
          stopped.push([stoppedName, stoppedPlaytime - timeGap]);
          break;
        }
      }
    }

    name = newName;
    start = newStart;
    playtime = newPlaytime;
  }

  answer.push(name);
  while (stopped.length) {
    answer.push(stopped.pop()[0]);
  }

  return answer;
}

function convertTimeToMin(time) {
  let [h, m] = time.split(":");
  return Number(h) * 60 + Number(m);
}

const plans1 = [
  ["korean", "11:40", "30"],
  ["english", "12:10", "20"],
  ["math", "12:30", "40"],
];
console.log(solution(plans1));

const plans2 = [
  ["science", "12:40", "50"],
  ["music", "12:20", "40"],
  ["history", "14:00", "30"],
  ["computer", "12:30", "100"],
];
console.log(solution(plans2));

const plans3 = [
  ["aaa", "12:00", "20"],
  ["bbb", "12:10", "30"],
  ["ccc", "12:40", "10"],
];
console.log(solution(plans3));
