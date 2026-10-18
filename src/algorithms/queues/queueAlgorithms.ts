import { StackQueueStep } from '../../types/algorithm';

export function generateQueueSteps(operations: Array<{ type: 'enqueue' | 'dequeue'; val?: number | string }>): StackQueueStep[] {
  const steps: StackQueueStep[] = [];
  const queue: Array<{ id: string; value: string | number; isHighlighted?: boolean }> = [];
  const capacity = 6;

  steps.push({
    stepIndex: 0,
    elements: [],
    operation: 'idle',
    capacity,
    explanation: 'Queue initialized (FIFO: First-In, First-Out). Elements enter at the rear and leave from the front.',
  });

  operations.forEach((op, idx) => {
    if (op.type === 'enqueue' && op.val !== undefined) {
      if (queue.length >= capacity) {
        steps.push({
          stepIndex: steps.length,
          elements: JSON.parse(JSON.stringify(queue)),
          operation: 'idle',
          capacity,
          explanation: `Queue Overflow! Cannot enqueue ${op.val}. Maximum capacity (${capacity}) reached.`,
        });
      } else {
        const item = { id: `q-${idx}-${op.val}`, value: op.val, isHighlighted: true };
        queue.push(item);
        steps.push({
          stepIndex: steps.length,
          elements: JSON.parse(JSON.stringify(queue)),
          operation: 'enqueue',
          capacity,
          explanation: `Enqueued [${op.val}] at the rear. Front element is [${queue[0].value}]. Size = ${queue.length}/${capacity}.`,
        });
      }
    } else if (op.type === 'dequeue') {
      if (queue.length === 0) {
        steps.push({
          stepIndex: steps.length,
          elements: [],
          operation: 'idle',
          capacity,
          explanation: 'Queue Underflow! Cannot dequeue from an empty queue.',
        });
      } else {
        const dequeued = queue.shift()!;
        steps.push({
          stepIndex: steps.length,
          elements: JSON.parse(JSON.stringify(queue)),
          operation: 'dequeue',
          capacity,
          explanation: `Dequeued [${dequeued.value}] from the front (FIFO). Next front element is ${queue.length > 0 ? `[${queue[0].value}]` : 'None (Empty)'}.`,
        });
      }
    }
  });

  return steps;
}
