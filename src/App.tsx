
import { useEffect, useState } from "react";

import { useDecision } from "./hooks/useDecision";
import type { DecisionData } from "./schemas/decisionSchema";

import { calculateScores } from "./utils/calculateScore";
import { syncScores } from "./utils/syncScores";
import OptionManager from "./components/OptionManager";
import CriteriaManager from "./components/CriteriaManager";
import ScoreTable from "./components/ScoreTable";
import ResultsPanel from "./components/ResultsPanel";

function App() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useDecision();

  // Original API data (never modify this copy)
  const [originalDecision, setOriginalDecision] =
    useState<DecisionData | null>(null);

  // Editable local decision data
  const [decision, setDecision] =
    useState<DecisionData | null>(null);

  // Initialize original and editable state from API
  useEffect(() => {
    if (data) {
      setOriginalDecision((current) =>
        current ?? structuredClone(data)
      );

      setDecision((current) =>
        current ?? structuredClone(data)
      );
    }
  }, [data]);

  // Reset to original API data
  const handleReset = () => {
    if (!originalDecision) return;

    setDecision(structuredClone(originalDecision));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <h2>Loading decision...</h2>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Something went wrong!
        </h2>

        <p className="my-3 text-gray-600">
          {error.message}
        </p>

        <button
          onClick={() => refetch()}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Waiting for data initialization
  if (!decision || !originalDecision) {
    return (
      <div className="p-8 text-center">
        <h2>Preparing decision...</h2>
      </div>
    );
  }

  // Calculate weighted results
  const results = calculateScores({
    options: decision.options,
    criteria: decision.criteria,
    scores: decision.scores,
  });

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Decision Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Compare your options and make better decisions.
            </p>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Reset to Original
          </button>

        </header>

        {/* Decision Title */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">

          <h2 className="mb-3 text-xl font-semibold">
            Decision Title
          </h2>

          <input
            type="text"
            value={decision.title}
            onChange={(e) =>
              setDecision({
                ...decision,
                title: e.target.value,
              })
            }
            placeholder="Enter decision title"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </section>

        {/* Option Manager */}
        {/* Option Manager */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <OptionManager
          options={decision.options}
          onChange={(updatedOptions) => {
          const updatedScores = syncScores(
          updatedOptions,
          decision.criteria,
          decision.scores
          );

          setDecision({
          ...decision,
          options: updatedOptions,
          scores: updatedScores,
          });
          }}
          />
        </section>

        {/* Criteria Manager */}
       {/* Criteria Manager */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
            <CriteriaManager
              criteria={decision.criteria}
              onChange={(updatedCriteria) => {
                const updatedScores = syncScores(
                  decision.options,
                  updatedCriteria,
                  decision.scores
                );

                setDecision({
                  ...decision,
                  criteria: updatedCriteria,
                  scores: updatedScores,
                });
              }}
            />
        </section>

        {/* Score Comparison */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">

          <ScoreTable
            options={decision.options}
            criteria={decision.criteria}
            scores={decision.scores}
            onChange={(updatedScores) =>
              setDecision({
                ...decision,
                scores: updatedScores,
              })
            }
          />

        </section>

        {/* Results Dashboard */}
        <ResultsPanel results={results} />

      </div>

    </main>
  );
}

export default App;
