export type AlgorithmStepType = 
  | 'compare'
  | 'swap'
  | 'highlight'
  | 'shift'
  | 'set'
  | 'eliminate'
  | 'found'
  | 'not_found'
  | 'insert'
  | 'delete'
  | 'push'
  | 'pop'
  | 'peek'
  | 'enqueue'
  | 'dequeue'
  | 'visit'
  | 'backtrack'
  | 'state_update'
  | 'info';

export interface ArrayElement {
  value: number;
  id: string;
  isPivot?: boolean;
  isSorted?: boolean;
  isCompared?: boolean;
  isSwapped?: boolean;
  isCurrent?: boolean;
  isTarget?: boolean;
  isEliminated?: boolean;
}

export interface ArrayAlgorithmStep {
  stepIndex: number;
  type: AlgorithmStepType;
  array: ArrayElement[];
  highlightIndices: number[];
  secondaryIndices?: number[];
  pointers?: { [key: string]: number };
  explanation: string;
  codeLine?: number;
  stats: {
    comparisons: number;
    swaps: number;
    writes: number;
    steps: number;
  };
}

export interface LinkedListNodeData {
  id: string;
  value: number | string;
  nextId: string | null;
  isHead?: boolean;
  isTail?: boolean;
  isSlow?: boolean;
  isFast?: boolean;
  isCycle?: boolean;
  isHighlighted?: boolean;
}

export interface LinkedListStep {
  stepIndex: number;
  nodes: LinkedListNodeData[];
  slowPointerId: string | null;
  fastPointerId: string | null;
  currentPointerId: string | null;
  explanation: string;
  codeLine?: number;
}

export interface StackQueueStep {
  stepIndex: number;
  elements: Array<{ id: string; value: string | number; isHighlighted?: boolean }>;
  operation: 'push' | 'pop' | 'peek' | 'enqueue' | 'dequeue' | 'idle';
  explanation: string;
  capacity?: number;
}

export interface HashMapStep {
  stepIndex: number;
  buckets: Array<{ index: number; pairs: Array<{ key: string; value: any; isHighlighted?: boolean }> }>;
  currentKey?: string;
  hashValue?: number;
  explanation: string;
}

export interface TreeNodeData {
  id: string;
  value: number;
  leftId: string | null;
  rightId: string | null;
  x?: number;
  y?: number;
  isVisited?: boolean;
  isCurrent?: boolean;
  isTarget?: boolean;
  isBSTViolation?: boolean;
}

export interface TreeStep {
  stepIndex: number;
  nodes: Record<string, TreeNodeData>;
  rootId: string | null;
  currentNodeId: string | null;
  visitedNodeIds: string[];
  callStack?: string[];
  queueState?: string[];
  explanation: string;
  codeLine?: number;
}

export interface GraphNodeData {
  id: string;
  label: string;
  x: number;
  y: number;
  distance?: number;
  isVisited?: boolean;
  isCurrent?: boolean;
}

export interface GraphEdgeData {
  from: string;
  to: string;
  weight?: number;
  isDirected?: boolean;
  isHighlighted?: boolean;
  inMST?: boolean;
}

export interface GraphStep {
  stepIndex: number;
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  currentNodeId: string | null;
  visitedIds: string[];
  queueOrStack: string[];
  distances?: Record<string, number>;
  previousNodes?: Record<string, string | null>;
  explanation: string;
}

export interface DPStep {
  stepIndex: number;
  table: Array<Array<{
    val: number | string;
    isCurrent?: boolean;
    isDependency?: boolean;
    isComputed?: boolean;
  }>>;
  rowHeaders?: string[];
  colHeaders?: string[];
  currentState: { i: number; j: number };
  dependencies: Array<{ i: number; j: number }>;
  transitionFormula: string;
  memoHit?: boolean;
  explanation: string;
}

export type PlayModeTab = 
  | 'concept'
  | 'visualizer'
  | 'play'
  | 'challenge'
  | 'code'
  | 'quiz'
  | 'complexity'
  | 'review';
