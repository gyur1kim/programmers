function solution(fees, records) {
  const LAST_TIME = 1439;

  for (let i = 0; i < records.length; i++) {
    const [time, carNumber, IO] = records[i].split(" ");
    const newTime = convertTimeFormat(time);
    records[i] = [newTime, carNumber, IO];
  }

  records.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  });

  const answer = [];
  let tmpAccTime = 0;

  for (let i = 0; i < records.length; i++) {
    const [time, carNumber, IO] = records[i];

    if (IO === "IN") {
      // 현재 차가 'IN'인데 다음 차가 없거나 다른 차량이면
      // 그 차량은 23:59분에 나간 것입니다
      if (!records[i + 1] || records[i + 1][1] !== carNumber) {
        tmpAccTime += LAST_TIME - time;
      }
      // 다음 차량도 같은 차이므로 그 차는 'OUT' 차량입니다.
      else {
        tmpAccTime += records[i + 1][0] - time;

        // 그그 다음 차도 같은 차량이면 시간을 누적합니다.
        if (records[i + 2] && records[i + 2][1] === carNumber) {
          i += 1;
          continue;
        }
      }

      // 누적된 시간으로 요금을 계산하고 누적 시간 초기화
      answer.push(calcFee(tmpAccTime));
      tmpAccTime = 0;
    }
  }

  return answer;

  function convertTimeFormat(hhmm) {
    let [hh, mm] = hhmm.split(":").map(Number);
    return hh * 60 + mm;
  }

  function calcFee(accTime) {
    const [defaultTime, defaultFee, unitTime, unitFee] = fees;
    let overTime = Math.ceil((accTime - defaultTime) / unitTime);
    if (overTime < 0) overTime = 0;
    return defaultFee + overTime * unitFee;
  }
}
