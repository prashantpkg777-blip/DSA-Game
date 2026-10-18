import { StackQueueStep } from '../../types/algorithm';

export function generateBalancedParenthesesSteps(expr: string): StackQueueStep[] {
  const steps: StackQueueStep[] = [];
  const stack: Array<{ id: string; value: string; isHighlighted?: boolean }> = [];

  steps.push({
    stepIndex: 0,
    elements: [],
    operation: 'idle',
    explanation: `Checking balanced parentheses for expression: "${expr}". Using Stack (LIFO). Push opening brackets, pop and match when encountering closing brackets.`,
  });

  const matching: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
  let isValid = true;

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];

    if (char === '(' || char === '{' || char === '[') {
      const item = { id: `item-${i}-${char}`, value: char, isHighlighted: true };
      stack.push(item);

      steps.push({
        stepIndex: steps.length,
        elements: JSON.parse(JSON.stringify(stack)),
        operation: 'push',
        explanation: `Index ${i}: Found opening bracket '${char}'. Pushed to stack top. Stack height = ${stack.length}.`,
      });
    } else if (char === ')' || char === '}' || char === ']') {
      if (stack.length === 0) {
        isValid = false;
        steps.push({
          stepIndex: steps.length,
          elements: [],
          operation: 'pop',
          explanation: `Index ${i}: Found closing bracket '${char}', but the stack is EMPTY! Unmatched closing bracket. String is INVALID.`,
        });
        break;
      }

      const top = stack.pop()!;
      const expected = matching[char];

      if (top.value === expected) {
        steps.push({
          stepIndex: steps.length,
          elements: JSON.parse(JSON.stringify(stack)),
          operation: 'pop',
          explanation: `Index ${i}: Found '${char}'. Popped '${top.value}' from stack. Perfect match (${expected} and ${char})! Stack height = ${stack.length}.`,
        });
      } else {
        isValid = false;
        steps.push({
          stepIndex: steps.length,
          elements: JSON.parse(JSON.stringify(stack)),
          operation: 'pop',
          explanation: `Index ${i}: Mismatched bracket! Expected matching for '${char}', but found '${top.value}' on stack. String is INVALID.`,
        });
        break;
      }
    }
  }

  if (isValid && stack.length === 0) {
    steps.push({
      stepIndex: steps.length,
      elements: [],
      operation: 'idle',
      explanation: 'All characters processed and stack is completely empty! The expression is VALID and BALANCED.',
    });
  } else if (isValid && stack.length > 0) {
    steps.push({
      stepIndex: steps.length,
      elements: JSON.parse(JSON.stringify(stack)),
      operation: 'idle',
      explanation: `Finished reading expression, but stack still has ${stack.length} unmatched opening bracket(s). Expression is INVALID.`,
    });
  }

  return steps;
}

export function generateNextGreaterElementSteps(nums: number[]): { steps: StackQueueStep[]; result: number[] } {
  const steps: StackQueueStep[] = [];
  const result: number[] = new Array(nums.length).fill(-1);
  const stack: Array<{ id: string; value: number; index: number }> = [];

  steps.push({
    stepIndex: 0,
    elements: [],
    operation: 'idle',
    explanation: `Next Greater Element (Monotonic Stack) for [${nums.join(', ')}]. We maintain a decreasing stack of elements from right to left.`,
  });

  for (let i = nums.length - 1; i >= 0; i--) {
    const val = nums[i];

    while (stack.length > 0 && stack[stack.length - 1].value <= val) {
      const popped = stack.pop()!;
      steps.push({
        stepIndex: steps.length,
        elements: stack.map(s => ({ id: s.id, value: `${s.value}` })),
        operation: 'pop',
        explanation: `At index ${i} (${val}): Popped ${popped.value} from stack because ${popped.value} <= ${val}. A smaller element to the right can never be the next greater for anything to the left.`,
      });
    }

    if (stack.length > 0) {
      result[i] = stack[stack.length - 1].value;
    } else {
      result[i] = -1;
    }

    stack.push({ id: `stk-${i}-${val}`, value: val, index: i });

    steps.push({
      stepIndex: steps.length,
      elements: stack.map(s => ({ id: s.id, value: `${s.value}` })),
      operation: 'push',
      explanation: `For index ${i} (${val}): Next greater element is ${result[i]}. Pushed ${val} onto monotonic stack.`,
    });
  }

  return { steps, result };
}
