const container = document.getElementById("barContainer");
const arraySizeInput = document.getElementById("arraySize");
let bars = [];
let stopSorting = false;

// Generate a new array
function generateArray() {
    stopSorting = true; // Stop any ongoing sorting
    container.innerHTML = "";
    let size = arraySizeInput.value;
    bars = [];

    for (let i = 0; i < size; i++) {
        let value = Math.floor(Math.random() * 100) + 10;
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        bar.innerHTML = `<span>${value}</span>`;
        bars.push(bar);
        container.appendChild(bar);
    }
}

// Disable buttons while sorting
function disableButtons(disabled) {
    document.querySelectorAll("button").forEach(button => button.disabled = disabled);
}

// Swap two bars with color effect
async function swapBars(bar1, bar2) {
    bar1.style.background = "red";
    bar2.style.background = "red";
    await new Promise(resolve => setTimeout(resolve, 300));

    let tempHeight = bar1.style.height;
    let tempText = bar1.innerHTML;
    bar1.style.height = bar2.style.height;
    bar1.innerHTML = bar2.innerHTML;
    bar2.style.height = tempHeight;
    bar2.innerHTML = tempText;

    await new Promise(resolve => setTimeout(resolve, 300));
    bar1.style.background = "coral";
    bar2.style.background = "coral";
}

// Bubble Sort
async function bubbleSort() {
    disableButtons(true);
    stopSorting = false;
    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            if (stopSorting) return;
            if (parseInt(bars[j].innerText) > parseInt(bars[j + 1].innerText)) {
                await swapBars(bars[j], bars[j + 1]);
            }
        }
    }
    finishSorting();
}

// Selection Sort
async function selectionSort() {
    disableButtons(true);
    stopSorting = false;
    for (let i = 0; i < bars.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < bars.length; j++) {
            if (stopSorting) return;
            if (parseInt(bars[j].innerText) < parseInt(bars[minIdx].innerText)) {
                minIdx = j;
            }
        }
        await swapBars(bars[i], bars[minIdx]);
    }
    finishSorting();
}

// Insertion Sort
async function insertionSort() {
    disableButtons(true);
    stopSorting = false;
    for (let i = 1; i < bars.length; i++) {
        let j = i;
        while (j > 0 && parseInt(bars[j - 1].innerText) > parseInt(bars[j].innerText)) {
            if (stopSorting) return;
            await swapBars(bars[j - 1], bars[j]);
            j--;
        }
    }
    finishSorting();
}

// Merge Sort
async function mergeSort(left = 0, right = bars.length - 1) {
    if (left >= right || stopSorting) return;
    let mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
    if (left === 0 && right === bars.length - 1) finishSorting();
}

async function merge(left, mid, right) {
    let tempArr = [];
    let i = left, j = mid + 1;

    while (i <= mid && j <= right) {
        if (stopSorting) return;
        let val1 = parseInt(bars[i].innerText);
        let val2 = parseInt(bars[j].innerText);
        if (val1 < val2) {
            tempArr.push(val1);
            i++;
        } else {
            tempArr.push(val2);
            j++;
        }
    }

    while (i <= mid) tempArr.push(parseInt(bars[i++].innerText));
    while (j <= right) tempArr.push(parseInt(bars[j++].innerText));

    for (let k = left; k <= right; k++) {
        if (stopSorting) return;
        bars[k].innerText = tempArr[k - left];
        bars[k].style.height = `${tempArr[k - left] * 3}px`;
        bars[k].style.background = "orange";
        await new Promise(resolve => setTimeout(resolve, 200));
        bars[k].style.background = "coral";
    }
}

// Quick Sort
async function quickSort(left = 0, right = bars.length - 1) {
    if (left >= right || stopSorting) return;
    let pivotIdx = await partition(left, right);
    await quickSort(left, pivotIdx - 1);
    await quickSort(pivotIdx + 1, right);
    if (left === 0 && right === bars.length - 1) finishSorting();
}

async function partition(left, right) {
    let pivot = parseInt(bars[right].innerText);
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (stopSorting) return;
        if (parseInt(bars[j].innerText) < pivot) {
            i++;
            await swapBars(bars[i], bars[j]);
        }
    }
    await swapBars(bars[i + 1], bars[right]);
    return i + 1;
}

// Heap Sort
async function heapSort() {
    disableButtons(true);
    stopSorting = false;
    let n = bars.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        if (stopSorting) return;
        await swapBars(bars[0], bars[i]);
        await heapify(i, 0);
    }
    finishSorting();
}

async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && parseInt(bars[left].innerText) > parseInt(bars[largest].innerText)) {
        largest = left;
    }
    if (right < n && parseInt(bars[right].innerText) > parseInt(bars[largest].innerText)) {
        largest = right;
    }
    if (largest !== i) {
        await swapBars(bars[i], bars[largest]);
        await heapify(n, largest);
    }
}

// Mark all bars green after sorting
function finishSorting() {
    for (let bar of bars) {
        bar.style.background = "green";
    }
    disableButtons(false);
}

// Start Sorting
function startSorting(type) {
    stopSorting = false;
    if (type === "bubble") bubbleSort();
    else if (type === "selection") selectionSort();
    else if (type === "insertion") insertionSort();
    else if (type === "merge") mergeSort();
    else if (type === "quick") quickSort();
    else if (type === "heap") heapSort();
}

// Initialize
generateArray();
