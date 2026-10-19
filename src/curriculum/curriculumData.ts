import { WorldRegion, TopicLesson } from '../types/curriculum';
import { world1Foundations } from './worlds/world1Foundations';
import { world2Arrays } from './worlds/world2Arrays';
import { world3Sorting } from './worlds/world3Sorting';
import { world4LinkedLists } from './worlds/world4LinkedLists';
import { world5StacksQueues } from './worlds/world5StacksQueues';
import { world6Trees } from './worlds/world6Trees';
import { world7Graphs } from './worlds/world7Graphs';
import { world8Backtracking } from './worlds/world8Backtracking';
import { world9Greedy } from './worlds/world9Greedy';
import { world10DP } from './worlds/world10DP';
import { world11Hashing } from './worlds/world11Hashing';
import { world12TriesStrings } from './worlds/world12TriesStrings';
import { world13AdvancedDS } from './worlds/world13AdvancedDS';
import { world14Competitive } from './worlds/world14Competitive';

export const WORLD_REGIONS: WorldRegion[] = [
  world1Foundations,
  world2Arrays,
  world3Sorting,
  world4LinkedLists,
  world5StacksQueues,
  world6Trees,
  world7Graphs,
  world8Backtracking,
  world9Greedy,
  world10DP,
  world11Hashing,
  world12TriesStrings,
  world13AdvancedDS,
  world14Competitive,
];

// Helper utility: Flatten all topics across all 14 worlds
export const getAllTopics = (): TopicLesson[] => {
  return WORLD_REGIONS.flatMap((region) => region.topics);
};

// Helper utility: Find topic by ID
export const findTopicById = (topicId: string): TopicLesson | undefined => {
  for (const region of WORLD_REGIONS) {
    const match = region.topics.find((t) => t.id === topicId);
    if (match) return match;
  }
  return undefined;
};

// Helper utility: Find world region by topic ID
export const findRegionByTopicId = (topicId: string): WorldRegion | undefined => {
  return WORLD_REGIONS.find((region) =>
    region.topics.some((t) => t.id === topicId)
  );
};
