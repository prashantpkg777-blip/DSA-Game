import { ArrayAlgorithmStep } from '../../types/algorithm';

export function generateTwoPointersSteps(nums: number[], targetSum?: number): ArrayAlgorithmStep[] {
  const steps: ArrayAlgorithmStep[] = [];
  const arr = [...nums];
  let left = 0;
  let right = arr.length - 1;

  steps.push({
    stepIndex: 0,
    type: 'info',
    array: arr.map((v, i) => ({ value: v, id: `elem-${i}-${v}` })),
    highlightIndices: [left, right],
    pointers: { left, right },
    explanation: 'Two Pointers technique initialized. Left pointer starts at index 0, right pointer starts at end of sorted array.',
    stats: { comparisons: 0, swaps: 0, writes: 0, steps: 0 },
  });

  let comparisons = 0;
  let found = false;

  while (left < right) {
    comparisons++;
    const currentSum = arr[left] + arr[right];

    steps.push({
      stepIndex: steps.length,
      type: 'compare',
      array: arr.map((v, idx) => ({
        value: v,
        id: `elem-${idx}-${v}`,
        isCompared: idx === left || idx === right,
      })),
      highlightIndices: [left, right],
      pointers: { left, right },
      explanation: `Inspecting arr[${left}] = ${arr[left]} and arr[${right}] = ${arr[right]}. Current sum = ${currentSum}. ${targetSum !== undefined ? `Target = ${targetSum}.` : ''}`,
      stats: { comparisons, swaps: 0, writes: 0, steps: steps.length },
    });

    if (targetSum !== undefined) {
      if (currentSum === targetSum) {
        found = true;
        steps.push({
          stepIndex: steps.length,
          type: 'found',
          array: arr.map((v, idx) => ({
            value: v,
            id: `elem-${idx}-${v}`,
            isTarget: idx === left || idx === right,
          })),
          highlightIndices: [left, right],
          pointers: { left, right },
          explanation: `Pair found! arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = target ${targetSum}!`,
          stats: { comparisons, swaps: 0, writes: 0, steps: steps.length },
        });
        break;
      } else if (currentSum < targetSum) {
        left++;
        steps.push({
          stepIndex: steps.length,
          type: 'shift',
          array: arr.map((v, idx) => ({ value: v, id: `elem-${idx}-${v}` })),
          highlightIndices: [left, right],
          pointers: { left, right },
          explanation: `Sum ${currentSum} < target ${targetSum}. To increase the sum, we advance the left pointer to index ${left}.`,
          stats: { comparisons, swaps: 0, writes: 0, steps: steps.length },
        });
      } else {
        right--;
        steps.push({
          stepIndex: steps.length,
          type: 'shift',
          array: arr.map((v, idx) => ({ value: v, id: `elem-${idx}-${v}` })),
          highlightIndices: [left, right],
          pointers: { left, right },
          explanation: `Sum ${currentSum} > target ${targetSum}. To decrease the sum, we move the right pointer left to index ${right}.`,
          stats: { comparisons, swaps: 0, writes: 0, steps: steps.length },
        });
      }
    } else {
      // Reversal demonstration
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;

      steps.push({
        stepIndex: steps.length,
        type: 'swap',
        array: arr.map((v, idx) => ({
          value: v,
          id: `elem-${idx}-${v}`,
          isSwapped: idx === left || idx === right,
        })),
        highlightIndices: [left, right],
        pointers: { left, right },
        explanation: `Swapped elements at index ${left} and ${right}.`,
        stats: { comparisons, swaps: left + 1, writes: (left + 1) * 2, steps: steps.length },
      });

      left++;
      right--;
    }
  }

  return steps;
}

export function generateKadaneSteps(nums: number[]): ArrayAlgorithmStep[] {
  const steps: ArrayAlgorithmStep[] = [];
  let maxSoFar = nums[0];
  let currentMax = nums[0];
  let startIdx = 0;
  let endIdx = 0;
  let tempStart = 0;

  steps.push({
    stepIndex: 0,
    type: 'info',
    array: nums.map((v, i) => ({ value: v, id: `elem-${i}-${v}`, isCurrent: i === 0 })),
    highlightIndices: [0],
    explanation: `Starting Kadane's Algorithm for Maximum Subarray Sum. Initialized currentMax = ${nums[0]}, maxSoFar = ${nums[0]}.`,
    stats: { comparisons: 0, swaps: 0, writes: 0, steps: 0 },
  });

  for (let i = 1; i < nums.length; i++) {
    const val = nums[i];
    const prevMax = currentMax;
    const extendSum = currentMax + val;

    if (val > extendSum) {
      currentMax = val;
      tempStart = i;
      steps.push({
        stepIndex: steps.length,
        type: 'set',
        array: nums.map((v, idx) => ({
          value: v,
          id: `elem-${idx}-${v}`,
          isCurrent: idx === i,
        })),
        highlightIndices: [i],
        pointers: { current: i },
        explanation: `Element ${val} is greater than (currentMax ${prevMax} + ${val} = ${extendSum}). Starting a fresh subarray at index ${i}! currentMax = ${val}.`,
        stats: { comparisons: i, swaps: 0, writes: 0, steps: steps.length },
      });
    } else {
      currentMax = extendSum;
      steps.push({
        stepIndex: steps.length,
        type: 'compare',
        array: nums.map((v, idx) => ({
          value: v,
          id: `elem-${idx}-${v}`,
          isCompared: idx >= tempStart && idx <= i,
        })),
        highlightIndices: [i],
        pointers: { current: i },
        explanation: `Extending existing subarray. (currentMax ${prevMax} + ${val}) = ${extendSum}. currentMax is now ${currentMax}.`,
        stats: { comparisons: i, swaps: 0, writes: 0, steps: steps.length },
      });
    }

    if (currentMax > maxSoFar) {
      maxSoFar = currentMax;
      startIdx = tempStart;
      endIdx = i;

      steps.push({
        stepIndex: steps.length,
        type: 'highlight',
        array: nums.map((v, idx) => ({
          value: v,
          id: `elem-${idx}-${v}`,
          isTarget: idx >= startIdx && idx <= endIdx,
        })),
        highlightIndices: Array.from({ length: endIdx - startIdx + 1 }, (_, k) => startIdx + k),
        explanation: `New global maximum subarray found! maxSoFar updated to ${maxSoFar} (indices [${startIdx}..${endIdx}]).`,
        stats: { comparisons: i, swaps: 0, writes: 0, steps: steps.length },
      });
    }
  }

  steps.push({
    stepIndex: steps.length,
    type: 'found',
    array: nums.map((v, idx) => ({
      value: v,
      id: `elem-${idx}-${v}`,
      isTarget: idx >= startIdx && idx <= endIdx,
      isSorted: true,
    })),
    highlightIndices: Array.from({ length: endIdx - startIdx + 1 }, (_, k) => startIdx + k),
    explanation: `Kadane's Algorithm complete! Maximum subarray sum is ${maxSoFar} in O(n) time, O(1) space.`,
    stats: { comparisons: nums.length - 1, swaps: 0, writes: 0, steps: steps.length },
  });

  return steps;
}

export function generateSlidingWindowSteps(nums: number[], k: number): ArrayAlgorithmStep[] {
  const steps: ArrayAlgorithmStep[] = [];
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }
  let maxSum = windowSum;
  let maxStart = 0;

  steps.push({
    stepIndex: 0,
    type: 'highlight',
    array: nums.map((v, i) => ({ value: v, id: `elem-${i}-${v}`, isCurrent: i < k })),
    highlightIndices: Array.from({ length: k }, (_, i) => i),
    pointers: { left: 0, right: k - 1 },
    explanation: `Starting Sliding Window (window size k = ${k}). Initial window [0..${k - 1}] sum = ${windowSum}.`,
    stats: { comparisons: 0, swaps: 0, writes: 0, steps: 0 },
  });

  for (let i = k; i < nums.length; i++) {
    const outgoing = nums[i - k];
    const incoming = nums[i];
    const prevSum = windowSum;
    windowSum = windowSum - outgoing + incoming;

    const isNewMax = windowSum > maxSum;
    if (isNewMax) {
      maxSum = windowSum;
      maxStart = i - k + 1;
    }

    steps.push({
      stepIndex: steps.length,
      type: isNewMax ? 'found' : 'shift',
      array: nums.map((v, idx) => ({
        value: v,
        id: `elem-${idx}-${v}`,
        isCompared: idx === i - k,
        isCurrent: idx >= i - k + 1 && idx <= i,
      })),
      highlightIndices: Array.from({ length: k }, (_, idx) => i - k + 1 + idx),
      pointers: { left: i - k + 1, right: i },
      explanation: `Slid window 1 step: subtracted outgoing ${outgoing} (index ${i - k}) and added incoming ${incoming} (index ${i}). New sum = ${prevSum} - ${outgoing} + ${incoming} = ${windowSum}. ${isNewMax ? `New max sum = ${maxSum}!` : `Max remains ${maxSum}.`}`,
      stats: { comparisons: i - k + 1, swaps: 0, writes: 0, steps: steps.length },
    });
  }

  steps.push({
    stepIndex: steps.length,
    type: 'info',
    array: nums.map((v, idx) => ({
      value: v,
      id: `elem-${idx}-${v}`,
      isTarget: idx >= maxStart && idx < maxStart + k,
    })),
    highlightIndices: Array.from({ length: k }, (_, idx) => maxStart + idx),
    explanation: `Sliding Window complete. Maximum window sum is ${maxSum} at indices [${maxStart}..${maxStart + k - 1}]. Computed in O(n) instead of O(n*k)!`,
    stats: { comparisons: nums.length - k, swaps: 0, writes: 0, steps: steps.length },
  });

  return steps;
}
