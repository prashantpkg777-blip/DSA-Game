import { TreeNodeData, TreeStep } from '../../types/algorithm';

export function createSampleBST(): Record<string, TreeNodeData> {
  // Balanced sample BST:
  //         10
  //       /    \
  //      5      15
  //     / \    /  \
  //    2   7  12  20
  return {
    'node-10': { id: 'node-10', value: 10, leftId: 'node-5', rightId: 'node-15', x: 250, y: 40 },
    'node-5': { id: 'node-5', value: 5, leftId: 'node-2', rightId: 'node-7', x: 130, y: 120 },
    'node-15': { id: 'node-15', value: 15, leftId: 'node-12', rightId: 'node-20', x: 370, y: 120 },
    'node-2': { id: 'node-2', value: 2, leftId: null, rightId: null, x: 70, y: 200 },
    'node-7': { id: 'node-7', value: 7, leftId: null, rightId: null, x: 190, y: 200 },
    'node-12': { id: 'node-12', value: 12, leftId: null, rightId: null, x: 310, y: 200 },
    'node-20': { id: 'node-20', value: 20, leftId: null, rightId: null, x: 430, y: 200 },
  };
}

export function generateBSTSearchSteps(target: number): TreeStep[] {
  const nodes = createSampleBST();
  const steps: TreeStep[] = [];
  const rootId = 'node-10';

  steps.push({
    stepIndex: 0,
    nodes: JSON.parse(JSON.stringify(nodes)),
    rootId,
    currentNodeId: rootId,
    visitedNodeIds: [],
    explanation: `Searching for target ${target} in Binary Search Tree. Property: Left sub-tree values < Root < Right sub-tree values. Starting at root [${nodes[rootId].value}].`,
  });

  let currId: string | null = rootId;
  const visited: string[] = [];
  let found = false;

  while (currId) {
    const node = nodes[currId];
    visited.push(currId);

    steps.push({
      stepIndex: steps.length,
      nodes: Object.fromEntries(
        Object.entries(nodes).map(([id, n]) => [
          id,
          {
            ...n,
            isCurrent: id === currId,
            isVisited: visited.includes(id),
          },
        ])
      ),
      rootId,
      currentNodeId: currId,
      visitedNodeIds: [...visited],
      explanation: `Inspecting node [${node.value}]. Comparing with target ${target}...`,
    });

    if (node.value === target) {
      found = true;
      steps.push({
        stepIndex: steps.length,
        nodes: Object.fromEntries(
          Object.entries(nodes).map(([id, n]) => [
            id,
            {
              ...n,
              isTarget: id === currId,
              isCurrent: id === currId,
              isVisited: visited.includes(id),
            },
          ])
        ),
        rootId,
        currentNodeId: currId,
        visitedNodeIds: [...visited],
        explanation: `Target ${target} FOUND at node [${node.value}]! O(h) = O(log n) efficiency in balanced BST.`,
      });
      break;
    } else if (target < node.value) {
      const nextLeft = node.leftId;
      steps.push({
        stepIndex: steps.length,
        nodes: JSON.parse(JSON.stringify(nodes)),
        rootId,
        currentNodeId: currId,
        visitedNodeIds: [...visited],
        explanation: `Target ${target} < current node [${node.value}]. By BST property, target must be in the LEFT subtree. Moving to ${nextLeft ? `[${nodes[nextLeft].value}]` : 'NULL'}.`,
      });
      currId = nextLeft;
    } else {
      const nextRight = node.rightId;
      steps.push({
        stepIndex: steps.length,
        nodes: JSON.parse(JSON.stringify(nodes)),
        rootId,
        currentNodeId: currId,
        visitedNodeIds: [...visited],
        explanation: `Target ${target} > current node [${node.value}]. By BST property, target must be in the RIGHT subtree. Moving to ${nextRight ? `[${nodes[nextRight].value}]` : 'NULL'}.`,
      });
      currId = nextRight;
    }
  }

  if (!found) {
    steps.push({
      stepIndex: steps.length,
      nodes: JSON.parse(JSON.stringify(nodes)),
      rootId,
      currentNodeId: null,
      visitedNodeIds: [...visited],
      explanation: `Reached NULL. Target ${target} does not exist in this BST.`,
    });
  }

  return steps;
}

export function generateTreeTraversalSteps(traversalType: 'inorder' | 'preorder' | 'postorder' | 'bfs'): TreeStep[] {
  const nodes = createSampleBST();
  const steps: TreeStep[] = [];
  const rootId = 'node-10';
  const visited: string[] = [];

  steps.push({
    stepIndex: 0,
    nodes: JSON.parse(JSON.stringify(nodes)),
    rootId,
    currentNodeId: rootId,
    visitedNodeIds: [],
    explanation: `Starting ${traversalType.toUpperCase()} traversal. Order of traversal defines the sequence in which nodes are visited and processed.`,
  });

  if (traversalType === 'bfs') {
    // Level Order traversal using queue
    const queue: string[] = [rootId];
    while (queue.length > 0) {
      const currId = queue.shift()!;
      visited.push(currId);
      const currNode = nodes[currId];

      if (currNode.leftId) queue.push(currNode.leftId);
      if (currNode.rightId) queue.push(currNode.rightId);

      steps.push({
        stepIndex: steps.length,
        nodes: Object.fromEntries(
          Object.entries(nodes).map(([id, n]) => [
            id,
            { ...n, isCurrent: id === currId, isVisited: visited.includes(id) },
          ])
        ),
        rootId,
        currentNodeId: currId,
        visitedNodeIds: [...visited],
        queueState: queue.map(id => `${nodes[id].value}`),
        explanation: `BFS visited [${currNode.value}]. Enqueued left and right children. Visited order so far: [${visited.map(id => nodes[id].value).join(', ')}].`,
      });
    }
  } else {
    // DFS recursive traversals
    function traverse(nodeId: string | null) {
      if (!nodeId) return;
      const node = nodes[nodeId];

      if (traversalType === 'preorder') {
        visited.push(nodeId);
        recordStep(nodeId, `Preorder: Visited ROOT [${node.value}] before traversing children.`);
      }

      traverse(node.leftId);

      if (traversalType === 'inorder') {
        visited.push(nodeId);
        recordStep(nodeId, `Inorder: Finished left subtree. Now visiting ROOT [${node.value}]. In BST, inorder produces sorted order!`);
      }

      traverse(node.rightId);

      if (traversalType === 'postorder') {
        visited.push(nodeId);
        recordStep(nodeId, `Postorder: Finished both left & right subtrees. Now visiting ROOT [${node.value}].`);
      }
    }

    function recordStep(currId: string, exp: string) {
      steps.push({
        stepIndex: steps.length,
        nodes: Object.fromEntries(
          Object.entries(nodes).map(([id, n]) => [
            id,
            { ...n, isCurrent: id === currId, isVisited: visited.includes(id) },
          ])
        ),
        rootId,
        currentNodeId: currId,
        visitedNodeIds: [...visited],
        explanation: `${exp} Output sequence: [${visited.map(id => nodes[id].value).join(', ')}].`,
      });
    }

    traverse(rootId);
  }

  steps.push({
    stepIndex: steps.length,
    nodes: Object.fromEntries(
      Object.entries(nodes).map(([id, n]) => [
        id,
        { ...n, isVisited: true },
      ])
    ),
    rootId,
    currentNodeId: null,
    visitedNodeIds: [...visited],
    explanation: `${traversalType.toUpperCase()} traversal complete! Final order: [${visited.map(id => nodes[id].value).join(' → ')}]. Time: O(n), Space: O(h).`,
  });

  return steps;
}
