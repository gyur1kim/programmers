class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(item) {
    this.queue.push(item);
    this.heapifyUp();
  }

  dequeue() {
    if (this.queue.length === 0) return null;

    const item = this.queue[0];
    const last = this.queue.pop();

    if (this.queue.length > 0) {
      this.queue[0] = last;
      this.heapifyDown();
    }

    return item;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  getLeftChildIdx(idx) {
    return idx * 2 + 1;
  }

  getRightChildIdx(idx) {
    return idx * 2 + 2;
  }

  getParentIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }

  swap(idx1, idx2) {
    [this.queue[idx1], this.queue[idx2]] = [this.queue[idx2], this.queue[idx1]];
  }

  heapifyUp() {
    let idx = this.queue.length - 1;

    while (idx > 0) {
      const parentIdx = this.getParentIdx(idx);
      if (this.queue[parentIdx] > this.queue[idx]) {
        this.swap(parentIdx, idx);
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let idx = 0;
    const length = this.queue.length;

    while (idx < length) {
      const leftIdx = this.getLeftChildIdx(idx);
      const rightIdx = this.getRightChildIdx(idx);
      let smallest = idx;

      if (leftIdx < length && this.queue[smallest] > this.queue[leftIdx]) {
        smallest = leftIdx;
      }
      if (rightIdx < length && this.queue[smallest] > this.queue[rightIdx]) {
        smallest = rightIdx;
      }

      if (smallest !== idx) {
        this.swap(idx, smallest);
        idx = smallest;
      } else {
        break;
      }
    }
  }
}

function solution(operations) {
  // pq는 최소힙으로 구현됨
  const MAX_PQ = new PriorityQueue(); // -1을 곱해서, 큰 값이 위로 오게 할거임
  const MIN_PQ = new PriorityQueue();
  const numMap = new Map();

  for (const operation of operations) {
    let [o, val] = operation.split(" ");
    val = +val;

    switch (o) {
      case "I":
        MAX_PQ.enqueue(val * -1);
        MIN_PQ.enqueue(val);
        numMap.set(val, (numMap.get(val) || 0) + 1);
        break;
      case "D":
        // 작은 값을 빼세요
        if (val === -1) {
          getMin();
        }
        // 큰 값을 빼세요
        else {
          getMax();
        }
    }
  }

  const min = getMin();
  if (min === null) return [0, 0];

  const max = getMax();
  if (max === null) return [min, min];
  return [max, min];

  function getMin() {
    while (!MIN_PQ.isEmpty()) {
      const min = MIN_PQ.dequeue();

      if (!numMap.has(min)) continue;

      const cnt = numMap.get(min);
      if (cnt === 1) {
        numMap.delete(min);
      } else {
        numMap.set(min, cnt - 1);
      }
      return min;
    }
    return null;
  }

  function getMax() {
    while (!MAX_PQ.isEmpty()) {
      let max = MAX_PQ.dequeue() * -1;

      if (!numMap.has(max)) continue;

      const cnt = numMap.get(max);
      if (cnt === 1) {
        numMap.delete(max);
      } else {
        numMap.set(max, cnt - 1);
      }

      return max;
    }
    return null;
  }
}

const input1 = ["I -45", "I 653", "D 1", "I -642", "I 45", "I 97", "D 1", "D -1", "I 333"];
const res1 = solution(input1);
console.log(res1);

const input2 = ["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"];
const res2 = solution(input2);
console.log(res2);

const input3 = ["I 1"];
const res3 = solution(input3);
console.log(res3);

// "I -45"
// minHeap(작은게 앞으로 감)       [-45]
// maxHeap(큰게 앞으로 감, * -1)  [45]

// "I 653"
// minHeap(작은게 앞으로 감)       [-45, 653]
// maxHeap(큰게 앞으로 감, * -1)  [-653, 45]

// "D 1"
// max에서 1 빼라는 뜻임
// 그러면 일단 max에서 하나 빼봐. (* -1) => 653이 나옴
// numMap에 653이 1개 카운트돼있잖아.
// 그럼 이걸 빼고, numMap에서 없애
// minHeap(작은게 앞으로 감)       [-45, 653]
// maxHeap(큰게 앞으로 감, * -1)  [45]

// "I -642"
// minHeap(작은게 앞으로 감)       [-642, -45, 653]
// maxHeap(큰게 앞으로 감, * -1)  [45, 642]

// "I 45"
// minHeap(작은게 앞으로 감)       [-642, -45, 45, 653]
// maxHeap(큰게 앞으로 감, * -1)  [-45, 45, 642]

// "I 97"
// minHeap(작은게 앞으로 감)       [-642, -45, 45, 97, 653]
// maxHeap(큰게 앞으로 감, * -1)  [-97, -45, 45, 642]

// "D 1"
// max에서 1 빼라는 뜻임
// 그러면 max에서 하나 pop해보자 (* -1) => 97이 나오게 됩니다
// numMap을 보면 97에 대해서 cnt가 돼있어...
// 그러면 이걸 pop하고, cnt를 하나 빼면 되겠쥬?
// minHeap(작은게 앞으로 감)       [-642, -45, 45, 97, 653]
// maxHeap(큰게 앞으로 감, * -1)  [-45, 45, 642]

// "D -1"
// 이번엔 작은거에서 하나 빼는거임.
// min에서 하나 빼면 -642가 나와용.
// numMap에는 -642가 하나 cnt돼있을거야.
// 그러면 이거 -1 하고, pop하면 되쥬?
// minHeap(작은게 앞으로 감)       [-45, 45, 97, 653]
// maxHeap(큰게 앞으로 감, * -1)  [-45, 45, 642]

// "I 333"
// minHeap(작은게 앞으로 감)       [-45, 45, 97, 333, 653]
// maxHeap(큰게 앞으로 감, * -1)  [-333, -45, 45, 642]

// max값은 333, min값은 -45가 맞나요?
