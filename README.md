# ⚔️ DSA Gamly — Master Data Structures & Algorithms Through Gaming

> **"Stop Memorizing DSA. Start Playing It."**
> A production-grade interactive game-based learning platform for mastering Data Structures and Algorithms through real algorithmic simulations, visual sandboxes, coding arenas, epic boss battles, and a cutting-edge **Glassmorphism UI/UX**.

---

## 🌟 Core Philosophy

```
LEARN ───► VISUALIZE ───► PLAY ───► CODE ───► MASTER
```

Unlike static problem lists or passive video tutorials, **DSA Gamly** computes every algorithm step using deterministic execution engines. You don't just read about algorithms—you step through them, play with them in interactive sandboxes, solve coding challenges, defeat guardian bosses, and permanently master edge cases.

---

## 🎨 Design System: Premium Glassmorphism UI/UX

- **Ambient Bokeh Background**: Vibrant floating gradient orbs in electric blue (`#4F7CFF`), violet (`#8B5CF6`), cyan (`#22D3EE`), and magenta (`#E879F9`) floating over deep navy space (`#060A16`).
- **Frosted Glass Panels**: Authentic `backdrop-filter: blur(20px–28px)` with translucent surfaces (`rgba(255, 255, 255, 0.05–0.14)`), delicate 15–25% white borders, and specular inner reflections.
- **Glass Controllers & Badges**: Tactile interactive controls, luminous status pills, glowing progress bars, and floating step runners.
- **Micro-Interactions**: Smooth hover lifts, active compression, ambient glows, and celebration particle confetti.

---

## 🗺️ The World of DSA Gamly (Curriculum & Regions)

1. **Coding Village** — *Programming Foundations & Complexity*
   - Big-O, Big-Omega, Big-Theta asymptotic bounds
   - Best, average, and worst-case mathematical analysis
   - Recursion fundamentals, call stack frames, and stack overflow limits
   - **Boss Battle:** *The Complexity Sentinel*

2. **Array Kingdom** — *Arrays and Strings*
   - In-place reversal & Dutch National Flag
   - Two Pointers technique
   - Sliding Window (fixed and dynamic windows)
   - Kadane's Algorithm for Maximum Subarray Sum
   - Prefix sums & difference arrays
   - **Boss Battle:** *The Array Golem*

3. **Sorting Desert** — *Sorting & Searching*
   - Binary Search on sorted arrays & Binary Search on Answer
   - Bubble Sort, Selection Sort, Insertion Sort
   - Merge Sort (Divide & Conquer) & Quick Sort (Lomuto/Hoare partitioning)
   - Information-theoretic lower bound $\Omega(n \log n)$ & stability
   - **Boss Battle:** *The Sorting Sphinx*

4. **Linked List Forest** — *Nodes & Pointers*
   - Singly, doubly, and circular linked lists
   - In-place iterative and recursive pointer reversal
   - Fast & Slow pointers (Tortoise & Hare)
   - Floyd's Cycle Detection & cycle entry identification
   - **Boss Battle:** *The Serpent of Pointers*

5. **Stack & Queue Citadel** — *LIFO & FIFO*
   - Stack operations, push/pop/peek, and overflow/underflow
   - Balanced delimiter & nested expression matching
   - Monotonic Stacks & Next Greater Element in $O(n)$
   - Queues, circular queues, deques, and queue-based BFS
   - **Boss Battle:** *The Stack Titan*

6. **Tree Kingdom & Graph Empire** — *Hierarchies & Networks*
   - Binary Search Trees (BST), invariant verification, insertion & search
   - Inorder, Preorder, Postorder, and Level-Order (BFS) traversals
   - Graph representations (Adjacency List & Matrix)
   - Breadth-First Search (BFS) & Depth-First Search (DFS)
   - Dijkstra's Single-Source Shortest Path Algorithm
   - Dynamic Programming 0/1 Knapsack matrix transitions
   - **Boss Battle:** *The Graph Overlord*

---

## 🎮 Playable Interactive Visualizers

- **Array Sorting Arena:** Real-time animated bar visualizer supporting Bubble, Selection, Insertion, Merge, and Quick Sort. Features speed adjustment (0.5x to 4x), step-forward/backward, live comparisons/swaps/writes counters, and an **Interactive Play Mode** where you manually click bars to swap them into sorted order!
- **Binary Search Dungeon:** Navigate sorted rooms, calculate midpoints, eliminate discarded search spaces, and test boundary conditions.
- **Linked List Builder:** Interactive node cards connected by pointer arrows with animated Tortoise & Hare pointers demonstrating Floyd's Cycle Finding algorithm and pointer reversals.
- **Stack Tower:** Physical LIFO tower with push/pop blocks and a real-time syntax parser matching nested brackets (`{[()]}`).
- **Tree Kingdom Canvas:** Interactive SVG node diagram rendering BST lookups and live traversals.
- **Graph Explorer:** Interactive weighted graph canvas with edge relaxation animations for Dijkstra and level-by-level BFS queues.
- **DP Matrix Lab:** Interactive Knapsack table visualizing state dependencies, cell transition formulas, and optimal subproblem computation.

---

## 🛠️ Technology Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **Code Editor:** Monaco Editor (`@monaco-editor/react`)
- **Code Execution Engine:** Secure isolated Web Worker sandbox with strict 2500ms watchdog timer (TLE protection), active abort cancellation support, neutralization of sensitive worker APIs (`fetch`, `XMLHttpRequest`, `WebSocket`, `importScripts`, `indexedDB`), and honest performance telemetry.
- **State & Persistence:** Zustand with `persist` middleware (local guest storage + optional Supabase sync)
- **Backend / Cloud:** Supabase (optional cloud sync with seamless local guest fallback)
- **Animations & Effects:** Framer Motion & Canvas Confetti
- **Icons:** Lucide React
- **Testing:** Automated verification suite covering 100% of core algorithm steps (23/23 tests passing)

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js `v18+` or `v20+` or `v24+`
- npm `v9+` or `v10+` or `v11+`

### 1. Clone & Install
```bash
git clone https://github.com/prashantpkg777-blip/DSA-Game.git
cd DSA-Game
npm install
```

### 2. Configure Environment (Optional)
If you wish to synchronize progress with Supabase, copy the example environment file:
```bash
cp .env.example .env
```
Fill in your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```
*(Note: If no Supabase credentials are provided, DSA Gamly runs in **Local Demo / Guest Mode** and persists all XP, streaks, achievements, and error records in your browser's local storage).*

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Automated Tests
```bash
npm test
```
Runs the 23-test algorithmic verification suite testing sorting, searching, array techniques, linked lists, stacks, trees, graphs, and dynamic programming.

### 5. Build for Production
```bash
npm run build
```
Creates an optimized, tree-shaken static bundle in the `dist/` directory ready for deployment on Vercel, Netlify, or Cloudflare Pages.

---

## 🏆 Gamification Mechanics

- **XP & Levels:** Earn XP by completing lessons, passing quizzes, solving code challenges, and defeating bosses.
- **Streaks:** Daily activity tracker with streak counter and fire animations.
- **Achievements:** Earn badges like *First Steps*, *Sorting Samurai*, *Pointer Ninja*, *Boss Slayer*, and *Bug Hunter*.
- **Daily Quests:** 3 procedural daily missions refreshing every 24 hours.
- **Error Notebook:** Automated spaced-repetition notebook that logs incorrect quiz responses and enables guided revision (+30 XP per reviewed mistake).

---

## 📄 License
MIT License. Built for computer science students, competitive programmers, and software engineers worldwide.
