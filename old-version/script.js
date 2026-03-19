let isPaused = false;

function pauseSort() {
  isPaused = true;
}

function resumeSort() {
  isPaused = false;
}

async function waitWhilePaused() {
  while (isPaused) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

let array = [];
const container = document.getElementById("array-container");
const algorithmSelect = document.getElementById("algorithm");
const complexityDisplay = document.getElementById("complexity");
const speedInput = document.getElementById("speed");

const complexities = {
  bubble: "O(n²)",
  selection: "O(n²)",
  insertion: "O(n²)",
  quick: "O(n log n)",
  merge: "O(n log n)"
};

let delay = 250;

algorithmSelect.addEventListener("change", () => {
  complexityDisplay.textContent = `Time Complexity: ${complexities[algorithmSelect.value]}`;
});

speedInput.addEventListener("input", () => {
  delay = parseInt(speedInput.value);
});

function generateArray(size = 30) {
  array = [];
  container.innerHTML = "";
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 250) + 10;
    array.push(value);
    const bar = document.createElement("div");
    bar.style.height = `${value}px`;
    bar.classList.add("bar");
    container.appendChild(bar);
  }
  complexityDisplay.textContent = `Time Complexity: ${complexities[algorithmSelect.value]}`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSort() {
  switch (algorithmSelect.value) {
    case "bubble": await bubbleSort(); break;
    case "selection": await selectionSort(); break;
    case "insertion": await insertionSort(); break;
    case "quick": await quickSort(0, array.length - 1); break;
    case "merge": await mergeSort(0, array.length - 1); break;
  }
}

async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";
      await sleep(delay);
      await waitWhilePaused();

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }
      bars[j].style.backgroundColor = "#3498db";
      bars[j + 1].style.backgroundColor = "#3498db";
    }
    bars[array.length - i - 1].style.backgroundColor = "green";
  }
}

async function selectionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    bars[minIdx].style.backgroundColor = "red";
    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = "orange";
      await sleep(delay);
      await waitWhilePaused();
      if (array[j] < array[minIdx]) {
        bars[minIdx].style.backgroundColor = "#3498db";
        minIdx = j;
        bars[minIdx].style.backgroundColor = "red";
      } else {
        bars[j].style.backgroundColor = "#3498db";
      }
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[minIdx].style.height = `${array[minIdx]}px`;
    }
    bars[i].style.backgroundColor = "green";
  }
}

async function insertionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j + 1]}px`;
      bars[j + 1].style.backgroundColor = "red";
      j--;
      await sleep(delay);
      await waitWhilePaused();
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
    bars[j + 1].style.backgroundColor = "green";
  }
}

async function quickSort(low, high) {
  if (low < high) {
    let pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

async function partition(low, high) {
  let pivot = array[high];
  let i = low - 1;
  const bars = document.getElementsByClassName("bar");
  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[j].style.height = `${array[j]}px`;
      await sleep(delay);
      await waitWhilePaused();
    }
  }
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  bars[i + 1].style.height = `${array[i + 1]}px`;
  bars[high].style.height = `${array[high]}px`;
  await sleep(delay);
  await waitWhilePaused();
  return i + 1;
}

async function mergeSort(left, right) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
  }
}

async function merge(left, mid, right) {
  const bars = document.getElementsByClassName("bar");
  const leftArr = array.slice(left, mid + 1);
  const rightArr = array.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      array[k] = leftArr[i++];
    } else {
      array[k] = rightArr[j++];
    }
    bars[k].style.height = `${array[k]}px`;
    bars[k].style.backgroundColor = "purple";
    await sleep(delay);
    await waitWhilePaused();
    k++;
  }
  while (i < leftArr.length) {
    array[k] = leftArr[i++];
    bars[k].style.height = `${array[k]}px`;
    bars[k].style.backgroundColor = "purple";
    await sleep(delay);
    await waitWhilePaused();
    k++;
  }
  while (j < rightArr.length) {
    array[k] = rightArr[j++];
    bars[k].style.height = `${array[k]}px`;
    bars[k].style.backgroundColor = "purple";
    await sleep(delay);
    await waitWhilePaused();
    k++;
  }
}

generateArray();
