import { ArrayAlgorithmStep } from '../../types/algorithm';

export function generateLinearSearchSteps(arr: number[], target: number): ArrayAlgorithmStep[] {
  const steps: ArrayAlgorithmStep[] = [];
  let comparisons = 0;

  steps.push({
    stepIndex: 0,
    type: 'info',
    array: arr.map((v, i) => ({ value: v, id: `elem-${i}-${v}` })),
    highlightIndices: [],
    explanation: `Starting Linear Search for target ${target}. We inspect each item one-by-one from index 0.`,
    stats: { comparisons: 0, swaps: 0, writes: 0, steps: 0 },
  });

  let foundIndex = -1;
  for (let i = 0; i < arr.length; i++) {
    comparisons++;
    const isMatch = arr[i] === target;

    steps.push({
      stepIndex: steps.length,
      type: isMatch ? 'found' : 'compare',
      array: arr.map((v, idx) => ({
        value: v,
        id: `elem-${idx}-${v}`,
        isCompared: idx === i,
        isTarget: idx === i && isMatch,
        isEliminated: idx < i,
      })),
      highlightIndices: [i],
      pointers: { current: i },
      explanation: isMatch
        ? `Target ${target} FOUND at index ${i}! Search stops successfully.`
        : `Index ${i}: arr[${i}] = ${arr[i]} is NOT equal to target ${target}. Moving to next index.`,
      stats: { comparisons, swaps: 0, writes: 0, steps: steps.length },
    });

    if (isMatch) {
      foundIndex = i;
      break;
    }
  }

  if (foundIndex === -1) {
    steps.push({
      stepIndex: steps.length,
      type: 'not_found',
      array: arr.map((v, idx) => ({
        value: v,
        id: `elem-${idx}-${v}`,
        isEliminated: true,
      })),
      highlightIndices: [],
      explanation: `Target ${target} was NOT found in the entire array. Time complexity: O(n).`,
      stats: { comparisons, swaps: 0, writes: 0, steps: steps.length },
    });
  }

  return steps;
}

export function generateBinarySearchSteps(sortedArr: number[], target: number): ArrayAlgorithmStep[] {
  const steps: ArrayAlgorithmStep[] = [];
  let comparisons = 0;
  let low = 0;
  let high = sortedArr.length - 1;

  steps.push({
    stepIndex: 0,
    type: 'info',
    array: sortedArr.map((v, i) => ({ value: v, id: `elem-${i}-${v}` })),
    highlightIndices: [],
    pointers: { low, high },
    explanation: `Starting Binary Search for target ${target}. Array must be sorted. Initial search range: [index ${low}..${high}].`,
    stats: { comparisons: 0, swaps: 0, writes: 0, steps: 0 },
  });

  let foundIndex = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;
    const midVal = sortedArr[mid];

    steps.push({
      stepIndex: steps.length,
      type: 'compare',
      array: sortedArr.map((v, idx) => ({
        value: v,
        id: `elem-${idx}-${v}`,
        isPivot: idx === mid,
        isEliminated: idx < low || idx > high,
        isCompared: idx === mid,
      })),
      highlightIndices: [mid],
      pointers: { low, mid, high },
      explanation: `Calculated mid = floor((${low} + ${high}) / 2) = ${mid}. Checking arr[${mid}] = ${midVal}.`,
      stats: { comparisons, swaps: 0, writes: 0, steps: steps.length },
    });

    if (midVal === target) {
      foundIndex = mid;
      steps.push({
        stepIndex: steps.length,
        type: 'found',
        array: sortedArr.map((v, idx) => ({
          value: v,
          id: `elem-${idx}-${v}`,
          isTarget: idx === mid,
          isEliminated: idx !== mid,
        })),
        highlightIndices: [mid],
        pointers: { mid },
        explanation: `Target ${target} FOUND at index ${mid}! In only ${comparisons} comparison(s). O(log n) efficiency.`,
        stats: { comparisons, swaps: 0, writes: 0, steps: steps.length },
      });
      break;
    } else if (midVal < target) {
      const oldLow = low;
      low = mid + 1;
      steps.push({
        stepIndex: steps.length,
        type: 'eliminate',
        array: sortedArr.map((v, idx) => ({
          value: v,
          id: `elem-${idx}-${v}`,
          isEliminated: idx < low || idx > high,
        })),
        highlightIndices: [mid],
        pointers: { low, high },
        explanation: `arr[${mid}] = ${midVal} < target ${target}. Because array is sorted, target cannot be in left half [${oldLow}..${mid}]. Discarding left half, moving low to ${low}.`,
        stats: { comparisons, swaps: 0, writes: 0, steps: steps.length },
      });
    } else {
      const oldHigh = high;
      high = mid - 1;
      steps.push({
        stepIndex: steps.length,
        type: 'eliminate',
        array: sortedArr.map((v, idx) => ({
          value: v,
          id: `elem-${idx}-${v}`,
          isEliminated: idx < low || idx > high,
        })),
        highlightIndices: [mid],
        pointers: { low, high },
        explanation: `arr[${mid}] = ${midVal} > target ${target}. Target cannot be in right half [${mid}..${oldHigh}]. Discarding right half, moving high to ${high}.`,
        stats: { comparisons, swaps: 0, writes: 0, steps: steps.length },
      });
    }
  }

  if (foundIndex === -1) {
    steps.push({
      stepIndex: steps.length,
      type: 'not_found',
      array: sortedArr.map((v, idx) => ({
        value: v,
        id: `elem-${idx}-${v}`,
        isEliminated: true,
      })),
      highlightIndices: [],
      explanation: `Search range exhausted (low ${low} > high ${high}). Target ${target} is NOT present in the array.`,
      stats: { comparisons, swaps: 0, writes: 0, steps: steps.length },
    });
  }

  return steps;
}
