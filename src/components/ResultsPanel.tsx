
import type { OptionResult } from "../utils/calculateScore";

interface ResultsPanelProps {
  results: OptionResult[];
}

function ResultsPanel({ results }: ResultsPanelProps) {
  if (results.length === 0) {
    return <p>No results available.</p>;
  }

  const winner = results[0];

  return (
    <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold text-gray-800">
        Decision Results
      </h2>

      <div className="mb-6 rounded-lg bg-green-50 p-5">
        <p className="text-sm font-medium text-green-700">
          Recommended Option
        </p>

        <h3 className="mt-1 text-2xl font-bold text-green-800">
          {winner.optionName}
        </h3>

        <p className="mt-1 text-green-700">
          Final Score: {winner.totalScore.toFixed(2)}%
        </p>
      </div>

      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Overall Ranking
      </h3>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={result.optionId}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="font-semibold text-gray-800">
                #{index + 1} {result.optionName}
              </div>

              <span className="font-bold text-blue-700">
                {result.totalScore.toFixed(2)}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{
                  width: `${Math.max(
                    0,
                    Math.min(100, result.totalScore)
                  )}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ResultsPanel;
