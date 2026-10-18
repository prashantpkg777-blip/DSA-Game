import { LinkedListNodeData, LinkedListStep } from '../../types/algorithm';

export function createInitialLinkedList(values: number[], cycleTargetIndex: number = -1): LinkedListNodeData[] {
  const nodes: LinkedListNodeData[] = values.map((val, idx) => ({
    id: `node-${idx}`,
    value: val,
    nextId: idx < values.length - 1 ? `node-${idx + 1}` : null,
    isHead: idx === 0,
    isTail: idx === values.length - 1,
  }));

  if (cycleTargetIndex >= 0 && cycleTargetIndex < values.length) {
    nodes[nodes.length - 1].nextId = `node-${cycleTargetIndex}`;
    nodes[nodes.length - 1].isCycle = true;
  }

  return nodes;
}

export function generateFloydCycleSteps(values: number[], cycleTargetIndex: number = -1): LinkedListStep[] {
  const steps: LinkedListStep[] = [];
  const nodes = createInitialLinkedList(values, cycleTargetIndex);

  steps.push({
    stepIndex: 0,
    nodes: JSON.parse(JSON.stringify(nodes)),
    slowPointerId: 'node-0',
    fastPointerId: 'node-0',
    currentPointerId: null,
    explanation: `Floyd's Tortoise and Hare Cycle-Finding Algorithm started. Both slow (1 step) and fast (2 steps) pointers start at the head node (${nodes[0].value}).`,
  });

  if (nodes.length <= 1) {
    steps.push({
      stepIndex: 1,
      nodes: JSON.parse(JSON.stringify(nodes)),
      slowPointerId: nodes[0]?.id || null,
      fastPointerId: null,
      currentPointerId: null,
      explanation: 'List has <= 1 node and cannot contain a cycle.',
    });
    return steps;
  }

  let slowIdx = 0;
  let fastIdx = 0;
  const n = values.length;
  let hasCycle = false;
  let iterations = 0;
  const maxIterations = 30;

  while (iterations < maxIterations) {
    iterations++;

    // Advance slow by 1
    if (slowIdx === n - 1 && cycleTargetIndex >= 0) {
      slowIdx = cycleTargetIndex;
    } else {
      slowIdx = slowIdx + 1;
    }

    // Advance fast by 2
    for (let k = 0; k < 2; k++) {
      if (fastIdx === n - 1 && cycleTargetIndex >= 0) {
        fastIdx = cycleTargetIndex;
      } else if (fastIdx < n - 1) {
        fastIdx = fastIdx + 1;
      } else {
        fastIdx = -1; // reached null
        break;
      }
    }

    if (fastIdx === -1) {
      steps.push({
        stepIndex: steps.length,
        nodes: JSON.parse(JSON.stringify(nodes)),
        slowPointerId: `node-${slowIdx}`,
        fastPointerId: null,
        currentPointerId: null,
        explanation: 'Fast pointer reached the end of the list (NULL). No cycle exists! Time: O(n), Space: O(1).',
      });
      break;
    }

    const slowNode = nodes[slowIdx];
    const fastNode = nodes[fastIdx];
    const collision = slowIdx === fastIdx;

    steps.push({
      stepIndex: steps.length,
      nodes: nodes.map(nd => ({
        ...nd,
        isSlow: nd.id === `node-${slowIdx}`,
        isFast: nd.id === `node-${fastIdx}`,
        isHighlighted: collision && nd.id === `node-${slowIdx}`,
      })),
      slowPointerId: `node-${slowIdx}`,
      fastPointerId: `node-${fastIdx}`,
      currentPointerId: null,
      explanation: collision
        ? `COLLISION! Slow and fast pointers met at node with value ${slowNode.value}! A cycle is proven to exist.`
        : `Slow pointer moved to [${slowNode.value}] (index ${slowIdx}), Fast pointer moved 2 steps to [${fastNode.value}] (index ${fastIdx}). Relative speed closes gap by 1 each step.`,
    });

    if (collision) {
      hasCycle = true;
      break;
    }
  }

  if (hasCycle) {
    steps.push({
      stepIndex: steps.length,
      nodes: nodes.map(nd => ({
        ...nd,
        isCycle: true,
      })),
      slowPointerId: `node-${slowIdx}`,
      fastPointerId: `node-${fastIdx}`,
      currentPointerId: null,
      explanation: `Phase 2: Cycle detected! By resetting one pointer to head and moving both at speed 1, they meet at the exact cycle entry node (node at index ${cycleTargetIndex}).`,
    });
  }

  return steps;
}

export function generateLinkedListReverseSteps(values: number[]): LinkedListStep[] {
  const steps: LinkedListStep[] = [];
  const nodes = createInitialLinkedList(values);

  steps.push({
    stepIndex: 0,
    nodes: JSON.parse(JSON.stringify(nodes)),
    slowPointerId: null,
    fastPointerId: null,
    currentPointerId: 'node-0',
    explanation: 'Starting Linked List Reversal (Iterative). We maintain three pointers: prev (null), curr (head), and next (curr.next).',
  });

  const stateNodes: LinkedListNodeData[] = JSON.parse(JSON.stringify(nodes));
  let prevId: string | null = null;
  let currId: string | null = 'node-0';

  let stepCount = 1;
  while (currId) {
    const currNode = stateNodes.find(n => n.id === currId)!;
    const nextId: string | null = currNode.nextId;

    steps.push({
      stepIndex: stepCount++,
      nodes: JSON.parse(JSON.stringify(stateNodes)),
      slowPointerId: prevId,
      fastPointerId: nextId,
      currentPointerId: currId,
      explanation: `At node [${currNode.value}]. Storing next pointer (pointing to ${nextId ? stateNodes.find(n => n.id === nextId)?.value : 'NULL'}).`,
    });

    // Reverse pointer
    currNode.nextId = prevId;

    steps.push({
      stepIndex: stepCount++,
      nodes: JSON.parse(JSON.stringify(stateNodes)),
      slowPointerId: prevId,
      fastPointerId: nextId,
      currentPointerId: currId,
      explanation: `Reversed pointer! Node [${currNode.value}] now points backwards to ${prevId ? stateNodes.find(n => n.id === prevId)?.value : 'NULL'}.`,
    });

    prevId = currId;
    currId = nextId;
  }

  // Update head and tail flags
  stateNodes.forEach(n => {
    n.isHead = n.id === prevId;
    n.isTail = n.nextId === null;
  });

  steps.push({
    stepIndex: stepCount,
    nodes: JSON.parse(JSON.stringify(stateNodes)),
    slowPointerId: null,
    fastPointerId: null,
    currentPointerId: prevId,
    explanation: `List reversal complete! New head is node [${stateNodes.find(n => n.id === prevId)?.value}]. Completed in O(n) time and O(1) space.`,
  });

  return steps;
}
