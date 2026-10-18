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

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✓ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] ${testName}`);
    failed++;
  }
}

console.log('\n======================================================');
console.log('       DSA Gamly — ALGORITHM VERIFICATION SUITE       ');
console.log('======================================================\n');

// 1. Sorting Suite
console.log('--- Suite 1: Sorting Algorithms ---');
const unsorted = [64, 34, 25, 12, 22, 11, 90];
const expectedSorted = [11, 12, 22, 25, 34, 64, 90];

const bubble = generateBubbleSortSteps(unsorted);
const bubbleFinal = bubble[bubble.length - 1].array.map(e => e.value);
assert(JSON.stringify(bubbleFinal) === JSON.stringify(expectedSorted), 'Bubble Sort produces sorted array');

const selection = generateSelectionSortSteps(unsorted);
const selFinal = selection[selection.length - 1].array.map(e => e.value);
assert(JSON.stringify(selFinal) === JSON.stringify(expectedSorted), 'Selection Sort produces sorted array');

const insertion = generateInsertionSortSteps(unsorted);
const insFinal = insertion[insertion.length - 1].array.map(e => e.value);
assert(JSON.stringify(insFinal) === JSON.stringify(expectedSorted), 'Insertion Sort produces sorted array');

const quick = generateQuickSortSteps(unsorted);
const quickFinal = quick[quick.length - 1].array.map(e => e.value);
assert(JSON.stringify(quickFinal) === JSON.stringify(expectedSorted), 'Quick Sort produces sorted array');

const merge = generateMergeSortSteps(unsorted);
const mergeFinal = merge[merge.length - 1].array.map(e => e.value);
assert(JSON.stringify(mergeFinal) === JSON.stringify(expectedSorted), 'Merge Sort produces sorted array');

// 2. Searching Suite
console.log('\n--- Suite 2: Searching Algorithms ---');
const searchArr = [10, 20, 30, 40, 50, 60, 70];
const bsFound = generateBinarySearchSteps(searchArr, 40);
assert(bsFound[bsFound.length - 1].type === 'found' && bsFound[bsFound.length - 1].pointers?.mid === 3, 'Binary Search finds middle element (40 at index 3)');

const bsNotFound = generateBinarySearchSteps(searchArr, 99);
assert(bsNotFound[bsNotFound.length - 1].type === 'not_found', 'Binary Search reports not found for 99');

const lsFound = generateLinearSearchSteps(searchArr, 20);
assert(lsFound[lsFound.length - 1].type === 'found', 'Linear Search finds element (20)');

// 3. Array Techniques
console.log('\n--- Suite 3: Array Techniques ---');
const kadaneSteps = generateKadaneSteps([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
assert(kadaneSteps[kadaneSteps.length - 1].explanation.includes('6'), 'Kadane algorithm calculates maximum subarray sum = 6');

const kadaneNeg = generateKadaneSteps([-5, -2, -8, -1]);
assert(kadaneNeg[kadaneNeg.length - 1].explanation.includes('-1'), 'Kadane handles all-negative array correctly (max = -1)');

const slideSteps = generateSlidingWindowSteps([2, 1, 5, 1, 3, 2], 3);
assert(slideSteps[slideSteps.length - 1].explanation.includes('9'), 'Sliding Window calculates max sum of size 3 = 9');

// 4. Linked Lists
console.log('\n--- Suite 4: Linked Lists ---');
const floydCycle = generateFloydCycleSteps([1, 2, 3, 4, 5], 1);
assert(floydCycle.some(s => s.explanation.includes('COLLISION')), 'Floyd Tortoise & Hare detects cycle collision');

const floydNoCycle = generateFloydCycleSteps([1, 2, 3, 4, 5], -1);
assert(floydNoCycle.some(s => s.explanation.includes('NULL')), 'Floyd detects end of list (NULL) when no cycle exists');

const revSteps = generateLinkedListReverseSteps([10, 20, 30]);
assert(revSteps[revSteps.length - 1].nodes.find(n => n.isHead)?.value === 30, 'Linked List reversal sets new head to 30');

// 5. Stacks and Queues
console.log('\n--- Suite 5: Stacks and Monotonic Stacks ---');
const parenValid = generateBalancedParenthesesSteps('{[()]}');
assert(parenValid[parenValid.length - 1].explanation.includes('VALID'), 'Balanced Parentheses accepts valid string "{[()]}"');

const parenInvalid = generateBalancedParenthesesSteps('([)]');
assert(parenInvalid[parenInvalid.length - 1].explanation.includes('INVALID'), 'Balanced Parentheses rejects mismatched string "([)]"');

const { result: ngeRes } = generateNextGreaterElementSteps([4, 5, 2, 25]);
assert(JSON.stringify(ngeRes) === JSON.stringify([5, 25, 25, -1]), 'Monotonic stack computes Next Greater Element [5, 25, 25, -1]');

// 6. Hashing & Trees
console.log('\n--- Suite 6: Hashing & Trees ---');
const { result: twoSumRes } = generateTwoSumHashMapSteps([2, 7, 11, 15], 9);
assert(JSON.stringify(twoSumRes) === JSON.stringify([0, 1]), 'Two Sum hash map finds indices [0, 1]');

const bstSearch = generateBSTSearchSteps(7);
assert(bstSearch.some(s => s.explanation.includes('FOUND')), 'BST Search finds target 7');

const bstInorder = generateTreeTraversalSteps('inorder');
assert(bstInorder[bstInorder.length - 1].explanation.includes('2 → 5 → 7 → 10 → 12 → 15 → 20'), 'BST Inorder traversal outputs keys in sorted order');

// 7. Graphs & DP
console.log('\n--- Suite 7: Graphs & Dynamic Programming ---');
const bfsSteps = generateGraphBFSSteps('A');
assert(bfsSteps[bfsSteps.length - 1].visitedIds.includes('F'), 'Graph BFS explores reachable node F');

const dijkstraSteps = generateDijkstraSteps('A');
assert(dijkstraSteps[dijkstraSteps.length - 1].distances?.['B'] === 3, 'Dijkstra computes shortest distance A -> B = 3');

const knapsack = generateKnapsackSteps([2, 3, 4], [3, 4, 5], 5);
const lastStep = knapsack[knapsack.length - 1];
assert(lastStep.transitionFormula.includes('Optimal Max Value = 7') && lastStep.explanation.includes('7'), '0/1 Knapsack computes optimal value = 7');

console.log('\n======================================================');
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('======================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
