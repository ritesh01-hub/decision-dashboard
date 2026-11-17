
import type { Option, Criterion } from "../types/decision";

type Scores = Record<string, Record<string, number>>;

export function syncScores(
  options: Option[],
  criteria: Criterion[],
  existingScores: Scores
): Scores {
  const updatedScores: Scores = {};

  options.forEach((option) => {
    updatedScores[option.id] = {};

    criteria.forEach((criterion) => {
      updatedScores[option.id][criterion.id] =
        existingScores[option.id]?.[criterion.id] ?? 0;
    });
  });

  return updatedScores;
}
