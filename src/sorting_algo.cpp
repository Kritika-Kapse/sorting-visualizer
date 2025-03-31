#include <iostream>
#include <vector>
#include <fstream>
#include <windows.h>  // For Sleep()

using namespace std;

// Function to print array to file
void printArrayToFile(const vector<int>& arr, const string& algoName, int pass) {
    ofstream file("output.txt", ios::app);
    if (!file) {
        cerr << "Error opening file!\n";
        return;
    }
    file << algoName << " - Pass " << pass << ": ";
    for (int num : arr) {
        file << num << " ";
    }
    file << endl;
    file.close();
    
    Sleep(500);  // Delay for animation
}

// Bubble Sort
void bubbleSort(vector<int> arr) {
    int n = arr.size();
    int pass = 1;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
            printArrayToFile(arr, "Bubble Sort", pass++);
        }
    }
}

// Selection Sort
void selectionSort(vector<int> arr) {
    int n = arr.size();
    int pass = 1;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
        printArrayToFile(arr, "Selection Sort", pass++);
    }
}

// Insertion Sort
void insertionSort(vector<int> arr) {
    int n = arr.size();
    int pass = 1;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
        printArrayToFile(arr, "Insertion Sort", pass++);
    }
}

// Merge Sort Helper
void merge(vector<int>& arr, int left, int mid, int right, int& pass) {
    vector<int> temp;
    int i = left, j = mid + 1;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);
        else temp.push_back(arr[j++]);
    }
    while (i <= mid) temp.push_back(arr[i++]);
    while (j <= right) temp.push_back(arr[j++]);

    for (int k = left; k <= right; k++) arr[k] = temp[k - left];
    printArrayToFile(arr, "Merge Sort", pass++);
}

// Merge Sort
void mergeSort(vector<int>& arr, int left, int right, int& pass) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid, pass);
    mergeSort(arr, mid + 1, right, pass);
    merge(arr, left, mid, right, pass);
}

// Quick Sort Helper
int partition(vector<int>& arr, int low, int high, int& pass) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    printArrayToFile(arr, "Quick Sort", pass++);
    return i + 1;
}

// Quick Sort
void quickSort(vector<int>& arr, int low, int high, int& pass) {
    if (low < high) {
        int pi = partition(arr, low, high, pass);
        quickSort(arr, low, pi - 1, pass);
        quickSort(arr, pi + 1, high, pass);
    }
}

// Heapify
void heapify(vector<int>& arr, int n, int i, int& pass) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        printArrayToFile(arr, "Heap Sort", pass++);
        heapify(arr, n, largest, pass);
    }
}

// Heap Sort
void heapSort(vector<int> arr) {
    int n = arr.size();
    int pass = 1;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i, pass);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        printArrayToFile(arr, "Heap Sort", pass++);
        heapify(arr, i, 0, pass);
    }
}

// Main function
int main() {
    vector<int> arr = {64, 25, 12, 22, 11};

    // Clear previous output
    ofstream file("output.txt", ios::trunc);
    file.close();

    cout << "Sorting Visualizer Output Saved in output.txt\n";

    // Run Sorting Algorithms
    bubbleSort(arr);
    selectionSort(arr);
    insertionSort(arr);

    // Merge Sort
    vector<int> mergeArr = arr;
    int mergePass = 1;
    mergeSort(mergeArr, 0, mergeArr.size() - 1, mergePass);

    // Quick Sort
    vector<int> quickArr = arr;
    int quickPass = 1;
    quickSort(quickArr, 0, quickArr.size() - 1, quickPass);

    // Heap Sort
    heapSort(arr);

    return 0;
}
