import { HashMapStep } from '../../types/algorithm';

export function generateTwoSumHashMapSteps(nums: number[], target: number): { steps: HashMapStep[]; result: [number, number] | null } {
  const steps: HashMapStep[] = [];
  const map: Map<number, number> = new Map(); // value -> index
  const bucketsCount = 5;
  const buckets: Array<{ index: number; pairs: Array<{ key: string; value: any; isHighlighted?: boolean }> }> = 
    Array.from({ length: bucketsCount }, (_, i) => ({ index: i, pairs: [] }));

  let result: [number, number] | null = null;

  steps.push({
    stepIndex: 0,
    buckets: JSON.parse(JSON.stringify(buckets)),
    explanation: `Two Sum with Hash Map initialized. Searching for pair summing to target = ${target}. Array: [${nums.join(', ')}]. Average lookup time: O(1).`,
  });

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const complement = target - current;
    const bucketIdx = Math.abs(current) % bucketsCount;

    steps.push({
      stepIndex: steps.length,
      buckets: JSON.parse(JSON.stringify(buckets)),
      currentKey: `${current}`,
      hashValue: bucketIdx,
      explanation: `Index ${i}: Current element = ${current}. Complement needed = target (${target}) - current (${current}) = ${complement}. Checking if ${complement} is in Hash Map...`,
    });

    if (map.has(complement)) {
      const complementIdx = map.get(complement)!;
      result = [complementIdx, i];

      // Highlight the found pair in buckets
      const compBucket = Math.abs(complement) % bucketsCount;
      const targetPair = buckets[compBucket].pairs.find(p => p.key === `${complement}`);
      if (targetPair) targetPair.isHighlighted = true;

      steps.push({
        stepIndex: steps.length,
        buckets: JSON.parse(JSON.stringify(buckets)),
        currentKey: `${current}`,
        explanation: `COMPLEMENT FOUND! ${complement} exists at index ${complementIdx}. Solution found: indices [${complementIdx}, ${i}] with values ${complement} + ${current} = ${target}! O(n) total time.`,
      });
      break;
    } else {
      // Store current in map and in visual buckets
      map.set(current, i);
      buckets[bucketIdx].pairs.push({ key: `${current}`, value: `idx:${i}` });

      steps.push({
        stepIndex: steps.length,
        buckets: JSON.parse(JSON.stringify(buckets)),
        currentKey: `${current}`,
        hashValue: bucketIdx,
        explanation: `${complement} not in map yet. Storing { key: ${current}, index: ${i} } in bucket #${bucketIdx}. Moving to next element.`,
      });
    }
  }

  return { steps, result };
}
