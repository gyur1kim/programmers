function solution(routes) {
  const LENGTH = routes.length;
  routes = routes.sort((a, b) => a[1] - b[1]);

  let answer = 1; // 최소 1대는 필요함
  let lastCamera = routes[0][1]; // 첫 차량의 진출 지점에 카메라 설치

  for (let i = 0; i < LENGTH; i++) {
    if (routes[i][0] <= lastCamera) continue;

    answer += 1;
    lastCamera = routes[i][1];
  }

  return answer;
}

const routes = [
  [-20, -15],
  [-14, -5],
  [-18, -13],
  [-5, -3],
];
solution(routes);
