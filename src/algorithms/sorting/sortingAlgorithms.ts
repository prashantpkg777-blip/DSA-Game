import { ArrayAlgorithmStep, ArrayElement } from '../../types/algorithm';

export function createArrayElements(nums: number[]): ArrayElement[] {
  return nums.map((val, idx) => ({
    value: val,
    id: `item-${idx}-${val}`,
  }));
}

export function generateBubbleSortSteps(initialNums: number[]): ArrayAlgorithmStep[] {
  const steps: ArrayAlgorithmStep[] = [];
  const arr = [...initialNums];
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  const n = arr.length;

  // Initial step
  steps.push({
    stepIndex: 0,
    type: 'info',
    array: arr.map((v, i) => ({ value: v, id: `elem-${i}-${v}` })),
    highlightIndices: [],
    explanation: 'Starting Bubble Sort. We repeatedly compare adjacent elements and swap them if they are in the wrong order.',
    stats: { comparisons, swaps, writes, steps: 0 },
  });

  for (let i = 0; i < n - 1; i++) {
    let swappedInPass = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      
      // Compare step
      steps.push({
        stepIndex: steps.length,
        type: 'compare',
        array: arr.map((v, idx) => ({
          value: v,
          id: `elem-${idx}-${v}`,
          isCompared: idx === j || idx === j + 1,
          isSorted: idx >= n - i,
        })),
        highlightIndices: [j, j + 1],
        explanation: `Comparing arr[${j}] = ${arr[j]} and arr[${j + 1}] = ${arr[j + 1]}. ${arr[j] > arr[j + 1] ? `${arr[j]} > ${arr[j + 1]}, so we must swap them.` : `${arr[j]} ≤ ${arr[j + 1]}, in correct relative order.`}`,
        stats: { comparisons, swaps, writes, steps: steps.length },
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swaps++;
        writes += 2;
        swappedInPass = true;

        steps.push({
          stepIndex: steps.length,
          type: 'swap',
          array: arr.map((v, idx) => ({
            value: v,
            id: `elem-${idx}-${v}`,
            isSwapped: idx === j || idx === j + 1,
            isSorted: idx >= n - i,
          })),
          highlightIndices: [j, j + 1],
          explanation: `Swapped ${arr[j + 1]} and ${arr[j]}. Larger element bubbles towards the right.`,
          stats: { comparisons, swaps, writes, steps: steps.length },
        });
      }
    }

    // Element at n - 1 - i is now placed in sorted position
    steps.push({
      stepIndex: steps.length,
      type: 'highlight',
      array: arr.map((v, idx) => ({
        value: v,
        id: `elem-${idx}-${v}`,
        isSorted: idx >= n - 1 - i,
      })),
      highlightIndices: [n - 1 - i],
      explanation: `Pass ${i + 1} complete. Element ${arr[n - 1 - i]} at index ${n - 1 - i} is locked in its final sorted position.`,
      stats: { comparisons, swaps, writes, steps: steps.length },
    });

    if (!swappedInPass) {
      steps.push({
        stepIndex: steps.length,
        type: 'info',
        array: arr.map((v, idx) => ({ value: v, id: `elem-${idx}-${v}`, isSorted: true })),
        highlightIndices: [],
        explanation: 'No swaps occurred during this entire pass! The array is already fully sorted (Early termination optimization).',
        stats: { comparisons, swaps, writes, steps: steps.length },
      });
      break;
    }
  }

  // Final sorted state
  steps.push({
    stepIndex: steps.length,
    type: 'info',
    array: arr.map((v, idx) => ({ value: v, id: `elem-${idx}-${v}`, isSorted: true })),
    highlightIndices: [],
    explanation: 'Bubble Sort complete! All elements are now sorted in ascending order.',
    stats: { comparisons, swaps, writes, steps: steps.length },
  });

  return steps;
}

export function generateSelectionSortSteps(initialNums: number[]): ArrayAlgorithmStep[] {
  const steps: ArrayAlgorithmStep[] = [];
  const arr = [...initialNums];
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  const n = arr.length;

  steps.push({
    stepIndex: 0,
    type: 'info',
    array: arr.map((v, i) => ({ value: v, id: `elem-${i}-${v}` })),
    highlightIndices: [],
    explanation: 'Starting Selection Sort. In each pass, we find the minimum element in the unsorted suffix and place it at the front.',
    stats: { comparisons, swaps, writes, steps: 0 },
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      const isNewMin = arr[j] < arr[minIdx];

      steps.push({
        stepIndex: steps.length,
        type: 'compare',
        array: arr.map((v, idx) => ({
          value: v,
          id: `elem-${idx}-${v}`,
          isPivot: idx === minIdx,
          isCompared: idx === j,
          isSorted: idx < i,
        })),
        highlightIndices: [minIdx, j],
        explanation: `Comparing candidate arr[${j}] = ${arr[j]} with current minimum arr[${minIdx}] = ${arr[minIdx]}. ${isNewMin ? `Found new minimum: ${arr[j]}!` : `${arr[j]} is not smaller than ${arr[minIdx]}.`}`,
        stats: { comparisons, swaps, writes, steps: steps.length },
      });

      if (isNewMin) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      swaps++;
      writes += 2;

      steps.push({
        stepIndex: steps.length,
        type: 'swap',
        array: arr.map((v, idx) => ({
          value: v,
          id: `elem-${idx}-${v}`,
          isSwapped: idx === i || idx === minIdx,
          isSorted: idx <= i,
        })),
        highlightIndices: [i, minIdx],
        explanation: `Swapping minimum element ${arr[i]} into index ${i}.`,
        stats: { comparisons, swaps, writes, steps: steps.length },
      });
    } else {
      writes += 0;
      steps.push({
        stepIndex: steps.length,
        type: 'highlight',
        array: arr.map((v, idx) => ({
          value: v,
          id: `elem-${idx}-${v}`,
          isSorted: idx <= i,
        })),
        highlightIndices: [i],
        explanation: `Element ${arr[i]} is already at index ${i}, no swap needed.`,
        stats: { comparisons, swaps, writes, steps: steps.length },
      });
    }
  }

  steps.push({
    stepIndex: steps.length,
    type: 'info',
    array: arr.map((v, idx) => ({ value: v, id: `elem-${idx}-${v}`, isSorted: true })),
    highlightIndices: [],
    explanation: 'Selection Sort finished! Total comparisons: ' + comparisons + ', swaps: ' + swaps + '.',
    stats: { comparisons, swaps, writes, steps: steps.length },
  });

  return steps;
}

export function generateInsertionSortSteps(initialNums: number[]): ArrayAlgorithmStep[] {
  const steps: ArrayAlgorithmStep[] = [];
  const arr = [...initialNums];
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  const n = arr.length;

  steps.push({
    stepIndex: 0,
    type: 'info',
    array: arr.map((v, i) => ({ value: v, id: `elem-${i}-${v}`, isSorted: i === 0 })),
    highlightIndices: [0],
    explanation: 'Starting Insertion Sort. The first element arr[0] is trivially sorted. We pick subsequent elements and insert each into its correct position.',
    stats: { comparisons, swaps, writes, steps: 0 },
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      stepIndex: steps.length,
      type: 'highlight',
      array: arr.map((v, idx) => ({
        value: v,
        id: `elem-${idx}-${v}`,
        isCurrent: idx === i,
        isSorted: idx < i,
      })),
      highlightIndices: [i],
      explanation: `Selected key = ${key} at index ${i}. Searching left for its insertion spot among already sorted elements.`,
      stats: { comparisons, swaps, writes, steps: steps.length },
    });

    while (j >= 0) {
      comparisons++;
      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        writes++;
        swaps++;

        steps.push({
          stepIndex: steps.length,
          type: 'shift',
          array: arr.map((v, idx) => ({
            value: v,
            id: `elem-${idx}-${v}`,
            isCompared: idx === j,
            isCurrent: idx === j + 1,
          })),
          highlightIndices: [j, j + 1],
          explanation: `${arr[j]} > ${key}. Shifted ${arr[j]} one position right to index ${j + 1}.`,
          stats: { comparisons, swaps, writes, steps: steps.length },
        });

        j--;
      } else {
        steps.push({
          stepIndex: steps.length,
          type: 'compare',
          array: arr.map((v, idx) => ({
            value: v,
            id: `elem-${idx}-${v}`,
            isCompared: idx === j,
          })),
          highlightIndices: [j],
          explanation: `${arr[j]} ≤ ${key}. Correct insertion spot found right after index ${j}.`,
          stats: { comparisons, swaps, writes, steps: steps.length },
        });
        break;
      }
    }

    arr[j + 1] = key;
    writes++;

    steps.push({
      stepIndex: steps.length,
      type: 'set',
      array: arr.map((v, idx) => ({
        value: v,
        id: `elem-${idx}-${v}`,
        isSorted: idx <= i,
      })),
      highlightIndices: [j + 1],
      explanation: `Inserted key ${key} at index ${j + 1}. The prefix up to index ${i} is now sorted!`,
      stats: { comparisons, swaps, writes, steps: steps.length },
    });
  }

  steps.push({
    stepIndex: steps.length,
    type: 'info',
    array: arr.map((v, idx) => ({ value: v, id: `elem-${idx}-${v}`, isSorted: true })),
    highlightIndices: [],
    explanation: 'Insertion Sort complete! Sorted in-place.',
    stats: { comparisons, swaps, writes, steps: steps.length },
  });

  return steps;
}

export function generateQuickSortSteps(initialNums: number[]): ArrayAlgorithmStep[] {
  const steps: ArrayAlgorithmStep[] = [];
  const arr = [...initialNums];
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;

  steps.push({
    stepIndex: 0,
    type: 'info',
    array: arr.map((v, i) => ({ value: v, id: `elem-${i}-${v}` })),
    highlightIndices: [],
    explanation: 'Starting Quick Sort (Divide and Conquer). We select a pivot, partition elements into smaller and greater, and recursively sort sub-arrays.',
    stats: { comparisons, swaps, writes, steps: 0 },
  });

  function quickSort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  }

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      stepIndex: steps.length,
      type: 'highlight',
      array: arr.map((v, idx) => ({
        value: v,
        id: `elem-${idx}-${v}`,
        isPivot: idx === high,
      })),
      highlightIndices: [high],
      explanation: `Chose pivot = ${pivot} at index ${high}. Partitioning subarray [${low}..${high}].`,
      stats: { comparisons, swaps, writes, steps: steps.length },
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      const isSmaller = arr[j] < pivot;

      steps.push({
        stepIndex: steps.length,
        type: 'compare',
        array: arr.map((v, idx) => ({
          value: v,
          id: `elem-${idx}-${v}`,
          isPivot: idx === high,
          isCompared: idx === j,
        })),
        highlightIndices: [j, high],
        explanation: `Comparing arr[${j}] = ${arr[j]} with pivot ${pivot}. ${isSmaller ? `${arr[j]} < ${pivot}, moving to left partition.` : `${arr[j]} ≥ ${pivot}, stays in right partition.`}`,
        stats: { comparisons, swaps, writes, steps: steps.length },
      });

      if (isSmaller) {
        i++;
        if (i !== j) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          swaps++;
          writes += 2;

          steps.push({
            stepIndex: steps.length,
            type: 'swap',
            array: arr.map((v, idx) => ({
              value: v,
              id: `elem-${idx}-${v}`,
              isSwapped: idx === i || idx === j,
              isPivot: idx === high,
            })),
            highlightIndices: [i, j],
            explanation: `Swapped arr[${i}] = ${arr[i]} and arr[${j}] = ${arr[j]}.`,
            stats: { comparisons, swaps, writes, steps: steps.length },
          });
        }
      }
    }

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    swaps++;
    writes += 2;

    steps.push({
      stepIndex: steps.length,
      type: 'swap',
      array: arr.map((v, idx) => ({
        value: v,
        id: `elem-${idx}-${v}`,
        isSorted: idx === i + 1,
      })),
      highlightIndices: [i + 1],
      explanation: `Placed pivot ${pivot} at its correct sorted position (index ${i + 1}). All elements to its left are ≤ ${pivot}, and all to its right are ≥ ${pivot}.`,
      stats: { comparisons, swaps, writes, steps: steps.length },
    });

    return i + 1;
  }

  quickSort(0, arr.length - 1);

  steps.push({
    stepIndex: steps.length,
    type: 'info',
    array: arr.map((v, idx) => ({ value: v, id: `elem-${idx}-${v}`, isSorted: true })),
    highlightIndices: [],
    explanation: 'Quick Sort completed! Average time complexity: O(n log n).',
    stats: { comparisons, swaps, writes, steps: steps.length },
  });

  return steps;
}

export function generateMergeSortSteps(initialNums: number[]): ArrayAlgorithmStep[] {
  const steps: ArrayAlgorithmStep[] = [];
  const arr = [...initialNums];
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;

  steps.push({
    stepIndex: 0,
    type: 'info',
    array: arr.map((v, i) => ({ value: v, id: `elem-${i}-${v}` })),
    highlightIndices: [],
    explanation: 'Starting Merge Sort. Divide the array into two halves, recursively sort both halves, and then merge the sorted halves in linear time.',
    stats: { comparisons, swaps, writes, steps: 0 },
  });

  function merge(left: number, mid: number, right: number) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    steps.push({
      stepIndex: steps.length,
      type: 'highlight',
      array: arr.map((v, idx) => ({
        value: v,
        id: `elem-${idx}-${v}`,
        isCompared: idx >= left && idx <= right,
      })),
      highlightIndices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      explanation: `Merging left sub-array [${L.join(', ')}] and right sub-array [${R.join(', ')}].`,
      stats: { comparisons, swaps, writes, steps: steps.length },
    });

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
      comparisons++;
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        writes++;
        steps.push({
          stepIndex: steps.length,
          type: 'set',
          array: arr.map((v, idx) => ({
            value: v,
            id: `elem-${idx}-${v}`,
            isCurrent: idx === k,
          })),
          highlightIndices: [k],
          explanation: `L[${i}] = ${L[i]} <= R[${j}] = ${R[j]}. Wrote ${L[i]} to index ${k}.`,
          stats: { comparisons, swaps, writes, steps: steps.length },
        });
        i++;
      } else {
        arr[k] = R[j];
        writes++;
        steps.push({
          stepIndex: steps.length,
          type: 'set',
          array: arr.map((v, idx) => ({
            value: v,
            id: `elem-${idx}-${v}`,
            isCurrent: idx === k,
          })),
          highlightIndices: [k],
          explanation: `R[${j}] = ${R[j]} < L[${i}] = ${L[i]}. Wrote ${R[j]} to index ${k}.`,
          stats: { comparisons, swaps, writes, steps: steps.length },
        });
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      writes++;
      k++;
      i++;
    }

    while (j < n2) {
      arr[k] = R[j];
      writes++;
      k++;
      j++;
    }

    steps.push({
      stepIndex: steps.length,
      type: 'highlight',
      array: arr.map((v, idx) => ({
        value: v,
        id: `elem-${idx}-${v}`,
        isSorted: idx >= left && idx <= right,
      })),
      highlightIndices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      explanation: `Sub-array from index ${left} to ${right} is now merged and sorted: [${arr.slice(left, right + 1).join(', ')}].`,
      stats: { comparisons, swaps, writes, steps: steps.length },
    });
  }

  function mergeSort(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSort(left, mid);
      mergeSort(mid + 1, right);
      merge(left, mid, right);
    }
  }

  mergeSort(0, arr.length - 1);

  steps.push({
    stepIndex: steps.length,
    type: 'info',
    array: arr.map((v, idx) => ({ value: v, id: `elem-${idx}-${v}`, isSorted: true })),
    highlightIndices: [],
    explanation: 'Merge Sort complete! Guaranteed O(n log n) time complexity, stable sorting.',
    stats: { comparisons, swaps, writes, steps: steps.length },
  });

  return steps;
}
