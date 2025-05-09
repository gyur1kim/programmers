function solution(line) {
  const intersection = [];

  for (let i = 0; i < line.length; i++) {
    for (let j = i + 1; j < line.length; j++) {
      const line1 = line[i];
      const line2 = line[j];

      const [x, y] = getIntersection(...line1, ...line2);
      if (Number.isInteger(x) && Number.isInteger(y)) intersection.push([x, y]);
    }
  }

  const minX = Math.min(...intersection.map(([x, _]) => x));
  const maxX = Math.max(...intersection.map(([x, _]) => x));
  const minY = Math.min(...intersection.map(([_, y]) => y));
  const maxY = Math.max(...intersection.map(([_, y]) => y));

  const answer = [];

  for (let i = maxY; i >= minY; i--) {
    const line = [];
    for (let j = minX; j <= maxX; j++) {
      if (intersection.filter(([x, y]) => x === j && y === i).length) line.push("*");
      else line.push(".");
    }
    answer.push(line.join(""));
  }

  return answer;

  function getIntersection(a, b, e, c, d, f) {
    const x = (b * f - e * d) / (a * d - b * c);
    const y = (e * c - a * f) / (a * d - b * c);

    return [x, y];
  }
}
