import { GraphEdgeData, GraphNodeData, GraphStep } from '../../types/algorithm';

export function createSampleGraph(): { nodes: GraphNodeData[]; edges: GraphEdgeData[] } {
  const nodes: GraphNodeData[] = [
    { id: 'A', label: 'A', x: 80, y: 120 },
    { id: 'B', label: 'B', x: 200, y: 60 },
    { id: 'C', label: 'C', x: 200, y: 180 },
    { id: 'D', label: 'D', x: 320, y: 60 },
    { id: 'E', label: 'E', x: 320, y: 180 },
    { id: 'F', label: 'F', x: 440, y: 120 },
  ];

  const edges: GraphEdgeData[] = [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 2 },
    { from: 'B', to: 'C', weight: 1 },
    { from: 'B', to: 'D', weight: 5 },
    { from: 'C', to: 'E', weight: 8 },
    { from: 'C', to: 'D', weight: 10 },
    { from: 'D', to: 'E', weight: 2 },
    { from: 'D', to: 'F', weight: 6 },
    { from: 'E', to: 'F', weight: 3 },
  ];

  return { nodes, edges };
}

export function generateGraphBFSSteps(startNodeId: string = 'A'): GraphStep[] {
  const { nodes, edges } = createSampleGraph();
  const steps: GraphStep[] = [];
  const visited: string[] = [];
  const queue: string[] = [startNodeId];
  visited.push(startNodeId);

  // Adjacency list
  const adj: Record<string, string[]> = {};
  nodes.forEach(n => (adj[n.id] = []));
  edges.forEach(e => {
    adj[e.from].push(e.to);
    adj[e.to].push(e.from);
  });

  steps.push({
    stepIndex: 0,
    nodes: nodes.map(n => ({ ...n, isCurrent: n.id === startNodeId, isVisited: n.id === startNodeId })),
    edges: [...edges],
    currentNodeId: startNodeId,
    visitedIds: [startNodeId],
    queueOrStack: [startNodeId],
    explanation: `Starting Breadth-First Search (BFS) from node ${startNodeId}. Uses a Queue (FIFO). Explores neighbors layer-by-layer.`,
  });

  while (queue.length > 0) {
    const currId = queue.shift()!;

    steps.push({
      stepIndex: steps.length,
      nodes: nodes.map(n => ({
        ...n,
        isCurrent: n.id === currId,
        isVisited: visited.includes(n.id),
      })),
      edges: edges.map(e => ({
        ...e,
        isHighlighted: e.from === currId || e.to === currId,
      })),
      currentNodeId: currId,
      visitedIds: [...visited],
      queueOrStack: [...queue],
      explanation: `Dequeued node ${currId}. Checking all unvisited neighbors...`,
    });

    const neighbors = adj[currId] || [];
    for (const neighbor of neighbors) {
      if (!visited.includes(neighbor)) {
        visited.push(neighbor);
        queue.push(neighbor);

        steps.push({
          stepIndex: steps.length,
          nodes: nodes.map(n => ({
            ...n,
            isCurrent: n.id === neighbor,
            isVisited: visited.includes(n.id),
          })),
          edges: edges.map(e => ({
            ...e,
            isHighlighted: (e.from === currId && e.to === neighbor) || (e.to === currId && e.from === neighbor),
          })),
          currentNodeId: neighbor,
          visitedIds: [...visited],
          queueOrStack: [...queue],
          explanation: `Discovered neighbor ${neighbor}! Marked visited and enqueued into FIFO queue. Queue: [${queue.join(', ')}].`,
        });
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    nodes: nodes.map(n => ({ ...n, isVisited: true })),
    edges: [...edges],
    currentNodeId: null,
    visitedIds: [...visited],
    queueOrStack: [],
    explanation: `BFS complete! Traversed all reachable nodes in order: [${visited.join(' → ')}]. Time: O(V + E).`,
  });

  return steps;
}

export function generateDijkstraSteps(startNodeId: string = 'A'): GraphStep[] {
  const { nodes, edges } = createSampleGraph();
  const steps: GraphStep[] = [];

  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const visited: string[] = [];

  nodes.forEach(n => {
    distances[n.id] = Infinity;
    previous[n.id] = null;
  });
  distances[startNodeId] = 0;

  // Build weighted adjacency list
  const adj: Record<string, Array<{ to: string; weight: number }>> = {};
  nodes.forEach(n => (adj[n.id] = []));
  edges.forEach(e => {
    adj[e.from].push({ to: e.to, weight: e.weight || 1 });
    adj[e.to].push({ to: e.from, weight: e.weight || 1 });
  });

  steps.push({
    stepIndex: 0,
    nodes: nodes.map(n => ({ ...n, distance: distances[n.id], isCurrent: n.id === startNodeId })),
    edges: [...edges],
    currentNodeId: startNodeId,
    visitedIds: [],
    queueOrStack: [startNodeId],
    distances: { ...distances },
    previousNodes: { ...previous },
    explanation: `Starting Dijkstra's Shortest Path from node ${startNodeId}. Initial distances: ${startNodeId} = 0, all others = ∞.`,
  });

  while (visited.length < nodes.length) {
    // Pick unvisited node with smallest distance
    let minNode: string | null = null;
    let minDist = Infinity;
    for (const n of nodes) {
      if (!visited.includes(n.id) && distances[n.id] < minDist) {
        minDist = distances[n.id];
        minNode = n.id;
      }
    }

    if (!minNode || minDist === Infinity) break;

    visited.push(minNode);

    steps.push({
      stepIndex: steps.length,
      nodes: nodes.map(n => ({
        ...n,
        distance: distances[n.id],
        isCurrent: n.id === minNode,
        isVisited: visited.includes(n.id),
      })),
      edges: [...edges],
      currentNodeId: minNode,
      visitedIds: [...visited],
      queueOrStack: nodes.filter(n => !visited.includes(n.id)).map(n => `${n.id}:${distances[n.id]}`),
      distances: { ...distances },
      previousNodes: { ...previous },
      explanation: `Selected unvisited node ${minNode} with minimum tentative distance (${minDist}). Relaxing its outgoing edges...`,
    });

    const neighbors = adj[minNode] || [];
    for (const edge of neighbors) {
      if (!visited.includes(edge.to)) {
        const newDist = distances[minNode] + edge.weight;
        const relaxed = newDist < distances[edge.to];

        if (relaxed) {
          const oldDist = distances[edge.to];
          distances[edge.to] = newDist;
          previous[edge.to] = minNode;

          steps.push({
            stepIndex: steps.length,
            nodes: nodes.map(n => ({
              ...n,
              distance: distances[n.id],
              isCurrent: n.id === edge.to,
              isVisited: visited.includes(n.id),
            })),
            edges: edges.map(e => ({
              ...e,
              isHighlighted: (e.from === minNode && e.to === edge.to) || (e.to === minNode && e.from === edge.to),
            })),
            currentNodeId: edge.to,
            visitedIds: [...visited],
            queueOrStack: nodes.filter(n => !visited.includes(n.id)).map(n => `${n.id}:${distances[n.id]}`),
            distances: { ...distances },
            previousNodes: { ...previous },
            explanation: `Edge relaxation on (${minNode} → ${edge.to}): new path distance ${newDist} is shorter than previous distance (${oldDist === Infinity ? '∞' : oldDist})! Updated distance of ${edge.to} to ${newDist}.`,
          });
        }
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    nodes: nodes.map(n => ({ ...n, distance: distances[n.id], isVisited: true })),
    edges: [...edges],
    currentNodeId: null,
    visitedIds: [...visited],
    queueOrStack: [],
    distances: { ...distances },
    previousNodes: { ...previous },
    explanation: `Dijkstra's Algorithm complete! Guaranteed shortest path distances from ${startNodeId}: ${Object.entries(distances).map(([k, v]) => `${k}:${v}`).join(', ')}.`,
  });

  return steps;
}
