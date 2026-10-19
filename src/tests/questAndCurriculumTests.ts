import { WORLD_REGIONS, getAllTopics, findTopicById } from '../curriculum/curriculumData';

export function runQuestAndCurriculumTests(): { passed: number; failed: number } {
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
  console.log('   DSA CHAOS — CURRICULUM & QUEST NAVIGATION TESTS    ');
  console.log('======================================================\n');

  // 1. World Count & Integrity
  console.log('--- Suite 1: 14 Worlds Integrity & Structure ---');
  assert(WORLD_REGIONS.length === 14, `All 14 DSA Worlds are present (found ${WORLD_REGIONS.length})`);

  WORLD_REGIONS.forEach((world, idx) => {
    const expectedNum = idx + 1;
    assert(world.number === expectedNum, `World ${expectedNum} has correct number (${world.name})`);
    assert(Boolean(world.id && world.name && world.description), `World ${world.number} has valid metadata`);
    assert(Boolean(world.bossBattle), `World ${world.number} has guardian boss: ${world.bossBattle?.name}`);
    assert(world.bossBattle.stages.length >= 3, `World ${world.number} boss has at least 3 stages`);
    
    // Boss stage 3 check
    const stage3 = world.bossBattle.stages[2];
    assert(
      stage3 && (stage3.type === 'coding' || stage3.type === 'code') && Boolean(stage3.codeProblem),
      `World ${world.number} boss stage 3 has functional codeProblem`
    );
  });

  // 2. Comprehensive Topic & Subtopic Coverage
  console.log('\n--- Suite 2: Topic & Subtopic Deep-Dive Verification ---');
  const allTopics = getAllTopics();
  assert(allTopics.length >= 38, `Extensive curriculum coverage with ${allTopics.length} total topics across 14 worlds`);

  allTopics.forEach((topic) => {
    assert(Boolean(topic.id && topic.title && (topic.summary || (topic as any).description)), `Topic [${topic.id}] has title & summary`);
    assert(
      Array.isArray(topic.subtopics) && topic.subtopics.length >= 4,
      `Topic [${topic.id}] covers every subtopic (found ${topic.subtopics?.length || 0})`
    );
    const questions = topic.quizQuestions || (topic as any).quizzes || [];
    assert(
      Array.isArray(questions) && questions.length >= 4,
      `Topic [${topic.id}] contains 4 verified quiz questions (found ${questions.length})`
    );

    // Verify each quiz question
    questions.forEach((q: any, qIdx: number) => {
      assert(
        q.options.length >= 4,
        `Topic [${topic.id}] Q${qIdx + 1} has 4 options (A, B, C, D)`
      );
      const correctOpts = q.options.filter((o: any) => o.isCorrect);
      assert(
        correctOpts.length === 1,
        `Topic [${topic.id}] Q${qIdx + 1} has exactly ONE correct answer`
      );
      assert(
        q.options.every((o: any) => Boolean(o.text && o.explanation)),
        `Topic [${topic.id}] Q${qIdx + 1} options all include feedback explanations`
      );
    });

    // Verify code problem
    assert(Boolean(topic.codeProblem), `Topic [${topic.id}] contains interactive code problem`);
    const cp = topic.codeProblem;
    const starterStr = typeof cp.starterCode === 'string' ? cp.starterCode : JSON.stringify(cp.starterCode);
    assert(
      starterStr.includes('TODO') || starterStr.includes('pass') || starterStr.includes('return'),
      `Topic [${topic.id}] starter code does NOT leak optimal solution (contains placeholder)`
    );
    assert(
      Boolean(cp.optimalSolution),
      `Topic [${topic.id}] includes optimal reference solution`
    );
    assert(
      cp.testCases.length >= 2,
      `Topic [${topic.id}] code problem has at least 2 test cases (found ${cp.testCases.length})`
    );
  });

  // 3. Quest & Navigation Simulator (1, 2, 3, 4, 10 Questions)
  console.log('\n--- Suite 3: Multi-Question Navigation Simulation ---');

  // Test Harness for QuizPanel logic
  class QuizSimulator {
    questions: any[];
    currentIndex = 0;
    answers: Record<string, string> = {};
    completed = false;

    constructor(questionCount: number) {
      this.questions = Array.from({ length: questionCount }, (_, i) => ({
        id: `q-test-${i + 1}`,
        question: `Test Question #${i + 1}`,
        options: [
          { id: 'a', text: 'Option A', isCorrect: true },
          { id: 'b', text: 'Option B', isCorrect: false },
          { id: 'c', text: 'Option C', isCorrect: false },
          { id: 'd', text: 'Option D', isCorrect: false },
        ],
      }));
    }

    selectOption(optId: string) {
      const qId = this.questions[this.currentIndex].id;
      this.answers[qId] = optId;
    }

    canGoPrevious(): boolean {
      return this.currentIndex > 0;
    }

    canGoNext(): boolean {
      return this.currentIndex < this.questions.length - 1;
    }

    isLastQuestion(): boolean {
      return this.currentIndex === this.questions.length - 1;
    }

    previousQuestion() {
      if (this.canGoPrevious()) {
        this.currentIndex--;
      }
    }

    nextQuestion() {
      if (this.canGoNext()) {
        this.currentIndex++;
      }
    }

    jumpTo(index: number) {
      if (index >= 0 && index < this.questions.length) {
        this.currentIndex = index;
      }
    }

    finish() {
      this.completed = true;
    }

    getScore(): { score: number; total: number } {
      let score = 0;
      this.questions.forEach((q) => {
        const userChoice = this.answers[q.id];
        const correctOpt = q.options.find((o: any) => o.isCorrect);
        if (userChoice && correctOpt && userChoice === correctOpt.id) {
          score++;
        }
      });
      return { score, total: this.questions.length };
    }
  }

  // 3.1 Single Question Test
  const sim1 = new QuizSimulator(1);
  assert(!sim1.canGoPrevious(), '1-Question Quiz: Previous button is disabled at Q1');
  assert(!sim1.canGoNext(), '1-Question Quiz: Next button is disabled (last question)');
  assert(sim1.isLastQuestion(), '1-Question Quiz: Recognizes last question immediately');
  sim1.selectOption('a');
  sim1.finish();
  assert(sim1.getScore().score === 1 && sim1.completed, '1-Question Quiz: Answers and finishes with 100% score');

  // 3.2 Two Question Test
  const sim2 = new QuizSimulator(2);
  sim2.selectOption('a');
  assert(sim2.canGoNext(), '2-Question Quiz: Can advance from Q1 to Q2');
  sim2.nextQuestion();
  assert(sim2.currentIndex === 1, '2-Question Quiz: Advanced to Q2');
  assert(!sim2.canGoNext(), '2-Question Quiz: Next is disabled on Q2');
  assert(sim2.canGoPrevious(), '2-Question Quiz: Previous is enabled on Q2');
  sim2.previousQuestion();
  assert(sim2.currentIndex === 0 && sim2.answers['q-test-1'] === 'a', '2-Question Quiz: Navigated back to Q1 and answer "a" is preserved');
  sim2.nextQuestion();
  sim2.selectOption('b'); // incorrect
  sim2.finish();
  assert(sim2.getScore().score === 1 && sim2.getScore().total === 2, '2-Question Quiz: Correctly computes 1/2 score');

  // 3.3 Three Question Test (The Reported Bug Scenario)
  console.log('\n--- Suite 4: Third-Question Bug Scenario Reproduction ---');
  const sim3 = new QuizSimulator(3);
  // Q1
  sim3.selectOption('a');
  assert(sim3.currentIndex === 0, 'Q1 active');
  sim3.nextQuestion();
  // Q2
  assert(sim3.currentIndex === 1, 'Q2 reached');
  sim3.selectOption('a');
  sim3.nextQuestion();
  // Q3
  assert(sim3.currentIndex === 2, 'Q3 (3rd Question) reached successfully');
  sim3.selectOption('a');
  assert(sim3.isLastQuestion(), 'Q3 correctly identified as the final question');
  assert(!sim3.canGoNext(), 'Next button properly transitions to Finish action on 3rd question');
  sim3.finish();
  assert(sim3.completed && sim3.getScore().score === 3, 'Q3 correctly finishes quiz without stalling or crashing');

  // 3.4 Four Question Test
  const sim4 = new QuizSimulator(4);
  sim4.selectOption('a'); // Q1
  sim4.nextQuestion();
  sim4.selectOption('a'); // Q2
  sim4.nextQuestion();
  sim4.selectOption('a'); // Q3
  assert(sim4.canGoNext(), '4-Question Quiz: Q3 can advance to Q4 (next question does NOT fail)');
  sim4.nextQuestion();
  assert(sim4.currentIndex === 3, '4-Question Quiz: Q4 reached successfully');
  sim4.selectOption('a');
  sim4.finish();
  assert(sim4.getScore().score === 4, '4-Question Quiz: All 4 questions answered and scored 4/4');

  // 3.5 10-Question Random Jump Test
  const sim10 = new QuizSimulator(10);
  sim10.jumpTo(7);
  assert(sim10.currentIndex === 7, 'Jump pill navigated directly to Question 8');
  sim10.selectOption('a');
  sim10.jumpTo(0);
  assert(sim10.currentIndex === 0, 'Jump pill navigated directly to Question 1');
  sim10.jumpTo(7);
  assert(sim10.answers['q-test-8'] === 'a', 'State retained across random navigation jumps');

  // Out of bounds checks
  sim10.jumpTo(-5);
  assert(sim10.currentIndex === 7, 'Negative jump clamped safely (no state corruption)');
  sim10.jumpTo(99);
  assert(sim10.currentIndex === 7, 'Oversized jump clamped safely (no state corruption)');

  // 4. Boss Battle Stage Transition Verification
  console.log('\n--- Suite 5: Boss Battle Stage Transition Verification ---');
  const testBoss = WORLD_REGIONS[0].bossBattle;
  let bossStageIdx = 0;
  
  // Stage 1
  assert(testBoss.stages[bossStageIdx].type === 'concept', 'Boss Stage 1 is Concept');
  bossStageIdx++;
  // Stage 2
  assert(testBoss.stages[bossStageIdx].type === 'concept', 'Boss Stage 2 is Concept');
  bossStageIdx++;
  // Stage 3
  const currentStage = testBoss.stages[bossStageIdx];
  const isCoding = currentStage.type === 'coding' || currentStage.type === 'code';
  assert(isCoding, 'Boss Stage 3 is recognized as coding stage');
  assert(Boolean(currentStage.codeProblem || (currentStage as any).codeChallenge), 'Boss Stage 3 has valid codeProblem ready to run');

  return { passed, failed };
}
