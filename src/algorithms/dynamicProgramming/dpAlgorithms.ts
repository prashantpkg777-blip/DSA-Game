import { DPStep } from '../../types/algorithm';

export function generateKnapsackSteps(weights: number[], values: number[], capacity: number): DPStep[] {
  const n = weights.length;
  // dp table of size (n + 1) x (capacity + 1)
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
  const steps: DPStep[] = [];

  const rowHeaders = ['0 (None)', ...weights.map((w, idx) => `Item ${idx + 1} (w:${w}, v:${values[idx]})`)];
  const colHeaders = Array.from({ length: capacity + 1 }, (_, w) => `Cap ${w}`);

  // Initial step
  steps.push({
    stepIndex: 0,
    table: dp.map(row => row.map(v => ({ val: v, isComputed: false }))),
    rowHeaders,
    colHeaders,
    currentState: { i: 0, j: 0 },
    dependencies: [],
    transitionFormula: 'dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])',
    explanation: `Starting 0/1 Knapsack Dynamic Programming table. Dimensions: ${n + 1} items × ${capacity + 1} capacities. Base row (0 items) initialized to 0 value.`,
  });

  for (let i = 1; i <= n; i++) {
    const wt = weights[i - 1];
    const val = values[i - 1];

    for (let w = 1; w <= capacity; w++) {
      const excludeVal = dp[i - 1][w];
      const dependencies: Array<{ i: number; j: number }> = [{ i: i - 1, j: w }];

      if (wt <= w) {
        const includeVal = val + dp[i - 1][w - wt];
        dependencies.push({ i: i - 1, j: w - wt });

        dp[i][w] = Math.max(excludeVal, includeVal);

        steps.push({
          stepIndex: steps.length,
          table: dp.map((row, rIdx) =>
            row.map((cellVal, cIdx) => ({
              val: cellVal,
              isCurrent: rIdx === i && cIdx === w,
              isDependency: dependencies.some(d => d.i === rIdx && d.j === cIdx),
              isComputed: (rIdx < i) || (rIdx === i && cIdx <= w),
            }))
          ),
          rowHeaders,
          colHeaders,
          currentState: { i, j: w },
          dependencies,
          transitionFormula: `dp[${i}][${w}] = max(exclude: dp[${i-1}][${w}] (${excludeVal}), include: ${val} + dp[${i-1}][${w - wt}] (${includeVal})) = ${dp[i][w]}`,
          explanation: `Item ${i} (weight ${wt}, value ${val}) fits in capacity ${w}. Taking maximum between excluding item (${excludeVal}) and including item (${includeVal}) → ${dp[i][w]}.`,
        });
      } else {
        dp[i][w] = excludeVal;

        steps.push({
          stepIndex: steps.length,
          table: dp.map((row, rIdx) =>
            row.map((cellVal, cIdx) => ({
              val: cellVal,
              isCurrent: rIdx === i && cIdx === w,
              isDependency: dependencies.some(d => d.i === rIdx && d.j === cIdx),
              isComputed: (rIdx < i) || (rIdx === i && cIdx <= w),
            }))
          ),
          rowHeaders,
          colHeaders,
          currentState: { i, j: w },
          dependencies,
          transitionFormula: `Item weight (${wt}) > capacity (${w}) → dp[${i}][${w}] = dp[${i-1}][${w}] (${excludeVal})`,
          explanation: `Item ${i} weight (${wt}) exceeds capacity (${w}). Cannot include item; inheriting optimal value from row above (${excludeVal}).`,
        });
      }
    }
  }

  // Final step
  const optimalValue = dp[n][capacity];
  steps.push({
    stepIndex: steps.length,
    table: dp.map((row, rIdx) =>
      row.map((cellVal, cIdx) => ({
        val: cellVal,
        isCurrent: rIdx === n && cIdx === capacity,
        isComputed: true,
      }))
    ),
    rowHeaders,
    colHeaders,
    currentState: { i: n, j: capacity },
    dependencies: [],
    transitionFormula: `Optimal Max Value = ${optimalValue}`,
    explanation: `Knapsack DP completed! Maximum achievable value for capacity ${capacity} is ${optimalValue}. Cell dp[${n}][${capacity}] contains the optimal solution in O(N × W) time.`,
  });

  return steps;
}
