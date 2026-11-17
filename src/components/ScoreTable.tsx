
import type { Option, Criterion } from "../types/decision";

interface ScoreTableProps {
  options: Option[];
  criteria: Criterion[];
  scores: Record<string, Record<string, number>>;
  onChange: (
    scores: Record<string, Record<string, number>>
  ) => void;
}

function ScoreTable({
  options,
  criteria,
  scores,
  onChange,
}: ScoreTableProps) {
  const updateScore = (
    optionId: string,
    criterionId: string,
    value: number
  ) => {
    onChange({
      ...scores,
      [optionId]: {
        ...scores[optionId],
        [criterionId]: value,
      },
    });
  };

  return (
    <div>
      <h2>Score Comparison</h2>

      <p>
        Enter raw values. Higher is better for benefit criteria;
        lower is better for cost criteria.
      </p>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Options</th>

              {criteria.map((criterion) => (
                <th key={criterion.id}>
                  {criterion.name}
                  <br />
                  ({criterion.weight}% - {criterion.type})
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {options.map((option) => (
              <tr key={option.id}>
                <td>{option.name}</td>

                {criteria.map((criterion) => (
                  <td key={criterion.id}>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={
                        scores[option.id]?.[criterion.id] ?? 0
                      }
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value === "") {
                          updateScore(
                            option.id,
                            criterion.id,
                            0
                          );
                          return;
                        }

                        const numericValue = Number(value);

                        if (
                          Number.isFinite(numericValue) &&
                          numericValue >= 0
                        ) {
                          updateScore(
                            option.id,
                            criterion.id,
                            numericValue
                          );
                        }
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScoreTable;
