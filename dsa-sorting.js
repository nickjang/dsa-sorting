/**
 * 1. Understanding merge sort
 * 21, 1
 * 16, 49
 * [21], [1]
 * [16], [49]
 */

/**
 * 2. Understanding quicksort
 * 1) The pivot could have been either 14 or 17 because they're the only numbers 
 * where the numbers to the left are less than them and the numbers to right are
 * greater.
 * 2) 3, 9, 10
 * 9, 3, 10, 13, 12
 */

/**
 * 3. Implementing quicksort
 */
function swap(arr, idx1, idx2) {
  const temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

function partition(arr, start, end) {
  let idx = start;
  let pivot = arr[end - 1];
  for (let i = start; i < end - 1; i++) {
    if (arr[i] <= pivot) {
      swap(arr, idx, i);
      idx++;
    }
  }
  swap(arr, idx, end - 1);
  // return pivot index
  return idx;
}

function qSort(arr, start = 0, end = arr.length) {
  if (end - start <= 1) return;

  const pivotIdx = partition(arr, start, end);
  qSort(arr, start, pivotIdx);
  qSort(arr, pivotIdx, end);
  return arr;
}
// console.log(qSort([89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]));

/**
 * Implementing merge sort
 */
function merge(arr, left, right) {
  let idx1 = 0;
  let idx2 = 0;
  let currIdx = 0;
  while (idx1 < left.length || idx2 < right.length) {
    // if all items in either left or right are put in the array
    if (idx1 >= left.length) arr[currIdx] = right[idx2++];
    else if (idx2 >= right.length) arr[currIdx] = left[idx1++];
    // otherwise
    else if (left[idx1] < right[idx2]) arr[currIdx] = left[idx1++];
    else arr[currIdx] = right[idx2++];
    currIdx++;
  }
}

function mSort(arr) {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = mSort(arr.slice(0, middle));
  const right = mSort(arr.slice(middle, arr.length));
  merge(arr, left, right);
  return arr;
}
// console.log(mSort([89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]));

/**
 * 5. Sorting a linked list using merge sort
 */
function reverse(list) {
  if (!list.head) return list;

  let orgHead = list.head;
  let currNode = list.head.next;
  let temp;
  while (currNode) {
    temp = currNode.next;
    currNode.next = list.head;
    list.head = currNode;
    orgHead.next = temp;
    currNode = temp;
  }
}

function mergeL(list, left, right) {
  let leftNode = left.head;
  let rightNode = right.head;

  while (leftNode || rightNode) {
    // if all items in either left or right are put in the listay
    if (!leftNode) {
      list.insertFirst(rightNode.value);
      rightNode = rightNode.next;
    } else if (!rightNode) {
      list.insertFirst(leftNode.value);
      leftNode = leftNode.next;
      // otherwise
    } else if (leftNode.value < rightNode.value) {
      list.insertFirst(leftNode.value);
      leftNode = leftNode.next;
    } else {
      list.insertFirst(rightNode.value);
      rightNode = rightNode.next;
    }
  }
  // reverse list
  reverse(list);
}

function mSortL(list) {
  if (!list.head || !list.head.next) return list;

  // split into two linked lists
  let left = new LinkedList();
  let right = new LinkedList();
  let currNode = list.head;
  let count = 0;
  while (currNode) {
    if (count % 2) left.insertFirst(currNode.value);
    else right.insertFirst(currNode.value);
    currNode = currNode.next;
    count++;
  }
  list.head = null;

  left = mSortL(left);
  right = mSortL(right);
  mergeL(list, left, right);
  return list;
}

// const { LinkedList, display } = require('./linked-list');
// const list = new LinkedList();
// list.insertFirst(2);
// list.insertFirst(3);
// list.insertFirst(1);
// list.insertFirst(4);
// display(mSortL(list));

/**
 * Bucket sort
 */
function bucketSort(arr, lowest, highest) {
  let offset = (arr.length - 1) / highest;
  let ratio = highest / (highest - lowest);
  let buckets = arr.map(() => []);

  for (let i = 0; i < arr.length; i++) {
    const idx = Math.ceil((offset * arr[i] - offset * lowest) * ratio);
    buckets[idx].push(arr[i]);
  }

  buckets.map(bucket => mSort(bucket));
  console.log(buckets);
  let idx = 0;
  while (idx < arr.length) {
    for (let i = 0; i < buckets.length; i++)
      for (let j = 0; j < buckets[i].length; j++)
        arr[idx++] = buckets[i][j];
  }
  return arr;
}

function countingSort(arr, lowest) {
  let counts = [];
  for (let i = 0; i < arr.length; i++) {
    let idx = arr[i] - lowest;
    if (counts[idx]) counts[idx]++;
    else counts[idx] = 1;
  }

  let ptr1 = 0;
  let ptr2 = 0;
  while (ptr1 < arr.length) {
    while (counts[ptr2] > 0) {
      arr[ptr1++] = ptr2 + lowest;
      counts[ptr2]--;
    }
    ptr2++;
  }
}

// const arr = [3, 0, 1, 1000];
// bucketSort(arr, 0, 1000);
// const arr2 = [3, 0, 1, 1000];
// countingSort(arr2, 0);
// console.log(arr, arr2);

/**
 * 7. Sort in place
  Write an algorithm to shuffle an array into a random order in place (i.e., without creating a new array).
 */
function randomSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    swap(arr, i, Math.floor(Math.random() * arr.length));
  }
}
// const arr = [0, 1, 2, 3];
// randomSort(arr);
// console.log(arr);

/**
 * 8. Sorting books
 * Use merge sort where the comparison is alphabetical.
 */
function compareBooks(book1, book2) {
  let idx = 0;
  while (idx < book1.length && idx < book2.length) {
    if (book1.charAt(idx) < book2.charAt(idx)) return -1;
    else if (book1.charAt(idx) > book2.charAt(idx)) return 1;
    idx++;
  }

  if (book1.length === book2.length) return 0;
  else if (idx < book1.length) return 1;
  else return -1;
}

function mergeB(arr, left, right) {
  let idx1 = 0;
  let idx2 = 0;
  let currIdx = 0;
  while (idx1 < left.length || idx2 < right.length) {
    // if all items in either left or right are put in the array
    if (idx1 >= left.length) arr[currIdx] = right[idx2++];
    else if (idx2 >= right.length) arr[currIdx] = left[idx1++];
    // otherwise
    else if (compareBooks(left[idx1], right[idx2]) < 0) arr[currIdx] = left[idx1++];
    else arr[currIdx] = right[idx2++];
    currIdx++;
  }
}

function sortBooks(books) {
  if (books.length <= 1) return books;
  const middle = Math.floor(books.length / 2);
  const left = mSort(books.slice(0, middle));
  const right = mSort(books.slice(middle, books.length));
  mergeB(books, left, right);
  return books;
}
console.log(sortBooks(['cde', 'bcd', 'abc', 'efg']));
