
import type { Option, Criterion } from "../types/decision";

interface CalculateScoreProps {
  options: Option[];
  criteria: Criterion[];
  scores: Record<string, Record<string, number>>;
}

export interface OptionResult {
  optionId: string;
  optionName: string;
  totalScore: number;
}

export function calculateScores({
  options,
  criteria,
  scores,
}: CalculateScoreProps): OptionResult[] {
  // Calculate total criterion weight
  const totalWeight = criteria.reduce(
    (total, criterion) => total + criterion.weight,
    0
  );

  // Avoid calculating with invalid or zero weights
  if (totalWeight <= 0) {
    return options.map((option) => ({
      optionId: option.id,
      optionName: option.name,
      totalScore: 0,
    }));
  }

  const results = options.map((option) => {
    let totalScore = 0;

    criteria.forEach((criterion) => {
      const values = options.map(
        (item) => scores[item.id]?.[criterion.id] ?? 0
      );

      const currentValue =
        scores[option.id]?.[criterion.id] ?? 0;

      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);

      let normalizedScore = 100;

      // If all options have the same value,
      // every option receives 100 for this criterion.
      if (maxValue !== minValue) {
        if (criterion.type === "benefit") {
          normalizedScore =
            ((currentValue - minValue) /
              (maxValue - minValue)) * 100;
        } else {
          normalizedScore =
            ((maxValue - currentValue) /
              (maxValue - minValue)) * 100;
        }
      }

      // Apply criterion weight
      totalScore +=
        normalizedScore * (criterion.weight / totalWeight);
    });

    return {
      optionId: option.id,
      optionName: option.name,
      totalScore: Number(totalScore.toFixed(2)),
    };
  });

  // Highest score first
  return results.sort(
    (a, b) => b.totalScore - a.totalScore
  );
}
