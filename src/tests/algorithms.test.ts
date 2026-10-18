import { describe, it, expect } from 'vitest';
import { 
  generateBubbleSortSteps, 
  generateSelectionSortSteps, 
  generateInsertionSortSteps, 
  generateQuickSortSteps, 
  generateMergeSortSteps 
} from '../algorithms/sorting/sortingAlgorithms';
import { 
  generateLinearSearchSteps, 
  generateBinarySearchSteps 
} from '../algorithms/searching/searchingAlgorithms';
import { 
  generateTwoPointersSteps, 
  generateKadaneSteps, 
  generateSlidingWindowSteps 
} from '../algorithms/arrays/arrayAlgorithms';
import { 
  generateFloydCycleSteps, 
  generateLinkedListReverseSteps 
} from '../algorithms/linkedLists/linkedListAlgorithms';
import { 
  generateBalancedParenthesesSteps, 
  generateNextGreaterElementSteps 
} from '../algorithms/stacks/stackAlgorithms';
import { generateTwoSumHashMapSteps } from '../algorithms/hashing/hashingAlgorithms';
import { generateBSTSearchSteps, generateTreeTraversalSteps } from '../algorithms/trees/treeAlgorithms';
import { generateGraphBFSSteps, generateDijkstraSteps } from '../algorithms/graphs/graphAlgorithms';
import { generateKnapsackSteps } from '../algorithms/dynamicProgramming/dpAlgorithms';

describe('Sorting Algorithms', () => {
  const unsorted = [64, 34, 25, 12, 22, 11, 90];
  const sorted = [11, 12, 22, 25, 34, 64, 90];

  it('Bubble Sort correctly sorts array', () => {
    const steps = generateBubbleSortSteps(unsorted);
    expect(steps.length).toBeGreaterThan(1);
    const finalArray = steps[steps.length - 1].array.map(e => e.value);
    expect(finalArray).toEqual(sorted);
  });

  it('Selection Sort correctly sorts array', () => {
    const steps = generateSelectionSortSteps(unsorted);
    expect(steps.length).toBeGreaterThan(1);
    const finalArray = steps[steps.length - 1].array.map(e => e.value);
    expect(finalArray).toEqual(sorted);
  });

  it('Insertion Sort correctly sorts array', () => {
    const steps = generateInsertionSortSteps(unsorted);
    expect(steps.length).toBeGreaterThan(1);
    const finalArray = steps[steps.length - 1].array.map(e => e.value);
    expect(finalArray).toEqual(sorted);
  });

  it('Quick Sort correctly sorts array', () => {
    const steps = generateQuickSortSteps(unsorted);
    expect(steps.length).toBeGreaterThan(1);
    const finalArray = steps[steps.length - 1].array.map(e => e.value);
    expect(finalArray).toEqual(sorted);
  });

  it('Merge Sort correctly sorts array', () => {
    const steps = generateMergeSortSteps(unsorted);
    expect(steps.length).toBeGreaterThan(1);
    const finalArray = steps[steps.length - 1].array.map(e => e.value);
    expect(finalArray).toEqual(sorted);
  });
});

describe('Searching Algorithms', () => {
  const arr = [10, 20, 30, 40, 50, 60, 70];

  it('Binary Search finds existing element', () => {
    const steps = generateBinarySearchSteps(arr, 40);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.type).toBe('found');
    expect(lastStep.pointers?.mid).toBe(3);
  });

  it('Binary Search reports not found for absent element', () => {
    const steps = generateBinarySearchSteps(arr, 99);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.type).toBe('not_found');
  });

  it('Linear Search finds target', () => {
    const steps = generateLinearSearchSteps(arr, 20);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.type).toBe('found');
  });
});

describe('Array Techniques', () => {
  it('Kadane finds maximum subarray sum with mixed numbers', () => {
    const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    const steps = generateKadaneSteps(nums);
    expect(steps[steps.length - 1].explanation).toContain('6');
  });

  it('Kadane works when all numbers are negative', () => {
    const nums = [-5, -2, -8, -1];
    const steps = generateKadaneSteps(nums);
    expect(steps[steps.length - 1].explanation).toContain('-1');
  });

  it('Sliding Window calculates maximum sum of size k', () => {
    const nums = [2, 1, 5, 1, 3, 2];
    const steps = generateSlidingWindowSteps(nums, 3);
    expect(steps[steps.length - 1].explanation).toContain('9');
  });
});

describe('Linked List Algorithms', () => {
  it('Floyd cycle detects collision when cycle is present', () => {
    const steps = generateFloydCycleSteps([1, 2, 3, 4, 5], 1);
    const hasCollision = steps.some(s => s.explanation.includes('COLLISION') || s.explanation.includes('Cycle detected'));
    expect(hasCollision).toBe(true);
  });

  it('Floyd cycle detects NULL when no cycle exists', () => {
    const steps = generateFloydCycleSteps([1, 2, 3, 4, 5], -1);
    const hasNull = steps.some(s => s.explanation.includes('NULL'));
    expect(hasNull).toBe(true);
  });

  it('Linked List Reversal reverses nodes correctly', () => {
    const steps = generateLinkedListReverseSteps([10, 20, 30]);
    const finalNodes = steps[steps.length - 1].nodes;
    expect(finalNodes.find(n => n.isHead)?.value).toBe(30);
  });
});

describe('Stack and Queue Algorithms', () => {
  it('Balanced Parentheses validates valid nested brackets', () => {
    const steps = generateBalancedParenthesesSteps('{[()]}');
    const lastStep = steps[steps.length - 1];
    expect(lastStep.explanation).toContain('VALID');
  });

  it('Balanced Parentheses rejects mismatched brackets', () => {
    const steps = generateBalancedParenthesesSteps('([)]');
    const lastStep = steps[steps.length - 1];
    expect(lastStep.explanation).toContain('INVALID');
  });

  it('Next Greater Element monotonic stack computes correct results', () => {
    const { result } = generateNextGreaterElementSteps([4, 5, 2, 25]);
    expect(result).toEqual([5, 25, 25, -1]);
  });
});

describe('Hashing & Trees', () => {
  it('Two Sum hash map finds complement indices', () => {
    const { result } = generateTwoSumHashMapSteps([2, 7, 11, 15], 9);
    expect(result).toEqual([0, 1]);
  });

  it('BST search finds target value', () => {
    const steps = generateBSTSearchSteps(7);
    const foundStep = steps.find(s => s.explanation.includes('FOUND'));
    expect(foundStep).toBeDefined();
  });

  it('BST inorder traversal produces sorted sequence', () => {
    const steps = generateTreeTraversalSteps('inorder');
    const lastStep = steps[steps.length - 1];
    expect(lastStep.explanation).toContain('2 → 5 → 7 → 10 → 12 → 15 → 20');
  });
});

describe('Graphs and Dynamic Programming', () => {
  it('Graph BFS visits all connected vertices', () => {
    const steps = generateGraphBFSSteps('A');
    const lastStep = steps[steps.length - 1];
    expect(lastStep.visitedIds).toContain('A');
    expect(lastStep.visitedIds).toContain('F');
  });

  it('Dijkstra algorithm calculates shortest path distances', () => {
    const steps = generateDijkstraSteps('A');
    const lastStep = steps[steps.length - 1];
    expect(lastStep.distances?.['A']).toBe(0);
    expect(lastStep.distances?.['B']).toBe(3); // A -> C (2) + C -> B (1) = 3
  });

  it('0/1 Knapsack DP computes optimal value', () => {
    const weights = [2, 3, 4];
    const values = [3, 4, 5];
    const capacity = 5;
    const steps = generateKnapsackSteps(weights, values, capacity);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.explanation).toContain('Optimal Max Value = 7'); // wt 2 (3) + wt 3 (4) = 7
  });
});
