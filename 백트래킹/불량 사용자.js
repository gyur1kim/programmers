function solution(user_id, banned_id) {
  const answerList = [];
  const bannedUserById = new Map(); // 제재 아이디에 해당되는 user id리스트 저장
  const bannedIdSet = new Set(banned_id); // 제재 아이디 중복 제거

  for (const banned of bannedIdSet) {
    for (const user of user_id) {
      const result = checkMasking(user, banned);
      // banned id랑 user id랑 같으면, 해당 banned id에 user id가 해당될 수 있다궁
      if (result) {
        const bannedUserList = bannedUserById.get(banned) || [];
        bannedUserList.push(user);
        bannedUserById.set(banned, [...bannedUserList]);
      }
    }
  }

  // 해당 visited는 user_id에 대치됩니다
  // visited[1]이 true면, user_id[1]에 해당하는 유저는 이미 제재 아이디로 분류된거임
  const visited = Array(user_id.length).fill(false);

  combination(0);

  return answerList.length;

  function combination(bannedIdx) {
    // 조합을 다 만든 경우, 이미 정답에 있는 케이스인지 체크 후 answer에 넣음
    if (bannedIdx === banned_id.length) {
      const copyVisited = JSON.stringify([...visited]);
      const isSame = answerList.find(x => x === copyVisited);
      if (!isSame) answerList.push(copyVisited);
      return;
    }

    // banned id에 해당되는 user id 리스트를 가져왕
    const userList = bannedUserById.get(banned_id[bannedIdx]);

    for (const user of userList) {
      const idx = user_id.indexOf(user);
      if (visited[idx]) continue;

      // 방문하지 않은 userId면 방문처리하고 다음거 고
      visited[idx] = true;
      combination(bannedIdx + 1);
      visited[idx] = false;
    }
  }

  function checkMasking(id, bannedId) {
    if (id.length !== bannedId.length) return false;

    for (let i = 0; i < id.length; i++) {
      if (bannedId[i] === "*") continue;
      if (bannedId[i] !== id[i]) return false;
    }

    return true;
  }
}
