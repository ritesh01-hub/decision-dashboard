
import { useState } from "react";
import type { Criterion } from "../types/decision";

interface CriteriaManagerProps {
  criteria: Criterion[];
  onChange: (criteria: Criterion[]) => void;
}

function CriteriaManager({
  criteria,
  onChange,
}: CriteriaManagerProps) {
  const [newName, setNewName] = useState("");
  const [newWeight, setNewWeight] = useState("0");
  const [newType, setNewType] = useState<"benefit" | "cost">("benefit");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editWeight, setEditWeight] = useState("0");
  const [editType, setEditType] = useState<"benefit" | "cost">("benefit");

  const [error, setError] = useState("");

  // Validate criterion
  const validateCriterion = (
    name: string,
    weightText: string,
    currentId?: string
  ) => {
    const trimmedName = name.trim();
    const weight = Number(weightText);

    if (!trimmedName) {
      return "Please enter a criterion name.";
    }

    const duplicate = criteria.some(
      (criterion) =>
        criterion.id !== currentId &&
        criterion.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (duplicate) {
      return "This criterion already exists.";
    }

    if (
      weightText.trim() === "" ||
      !Number.isFinite(weight) ||
      weight < 0
    ) {
      return "Weight must be a valid non-negative number.";
    }

    return "";
  };

  // Add criterion
  const addCriterion = () => {
    const validationError = validateCriterion(newName, newWeight);

    if (validationError) {
      setError(validationError);
      return;
    }

    const newCriterion: Criterion = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      weight: Number(newWeight),
      type: newType,
    };

    onChange([...criteria, newCriterion]);

    setNewName("");
    setNewWeight("0");
    setNewType("benefit");
    setError("");
  };

  // Start editing
  const startEditing = (criterion: Criterion) => {
    setEditingId(criterion.id);
    setEditName(criterion.name);
    setEditWeight(String(criterion.weight));
    setEditType(criterion.type);
    setError("");
  };

  // Save changes
  const saveCriterion = (id: string) => {
    const validationError = validateCriterion(
      editName,
      editWeight,
      id
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    const updatedCriteria = criteria.map((criterion) =>
      criterion.id === id
        ? {
            ...criterion,
            name: editName.trim(),
            weight: Number(editWeight),
            type: editType,
          }
        : criterion
    );

    onChange(updatedCriteria);

    setEditingId(null);
    setError("");
  };

  // Remove criterion
  const removeCriterion = (id: string) => {
    if (criteria.length <= 1) {
      setError("At least one criterion is required.");
      return;
    }

    onChange(
      criteria.filter((criterion) => criterion.id !== id)
    );

    setError("");
  };

  // Calculate total weight
  const totalWeight = criteria.reduce(
    (total, criterion) => total + criterion.weight,
    0
  );

  const hasValidTotal = Math.abs(totalWeight - 100) < 0.001;

  return (
    <div>
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        Manage Criteria
      </h2>

      {/* Add criterion */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

        <input
          type="text"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
            setError("");
          }}
          placeholder="Enter criterion name"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <input
          type="number"
          min="0"
          step="any"
          value={newWeight}
          onChange={(e) => {
            setNewWeight(e.target.value);
            setError("");
          }}
          placeholder="Weight"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <select
          value={newType}
          onChange={(e) =>
            setNewType(e.target.value as "benefit" | "cost")
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
        >
          <option value="benefit">Benefit</option>
          <option value="cost">Cost</option>
        </select>

        <button
          type="button"
          onClick={addCriterion}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Add Criterion
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p role="alert" className="mb-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Display criteria */}
      <div className="space-y-3">

        {criteria.map((criterion) => (
          <div
            key={criterion.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 p-4"
          >

            {editingId === criterion.id ? (
              <>
                <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-3">

                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => {
                      setEditName(e.target.value);
                      setError("");
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                  />

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={editWeight}
                    onChange={(e) => {
                      setEditWeight(e.target.value);
                      setError("");
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                  />

                  <select
                    value={editType}
                    onChange={(e) =>
                      setEditType(e.target.value as "benefit" | "cost")
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  >
                    <option value="benefit">Benefit</option>
                    <option value="cost">Cost</option>
                  </select>

                </div>

                <div className="flex items-center gap-3">

                  <button
                    type="button"
                    onClick={() => saveCriterion(criterion.id)}
                    className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setError("");
                    }}
                    className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                </div>
              </>
            ) : (
              <>
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-gray-800">
                    {criterion.name}
                  </span>

                  <span className="ml-2 text-sm text-gray-500">
                    {criterion.weight}% ({criterion.type})
                  </span>
                </div>

                <div className="flex items-center gap-3">

                  <button
                    type="button"
                    onClick={() => startEditing(criterion)}
                    className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => removeCriterion(criterion.id)}
                    className="rounded-lg bg-red-100 px-4 py-2 text-red-700 transition hover:bg-red-200"
                  >
                    Remove
                  </button>

                </div>
              </>
            )}

          </div>
        ))}

      </div>

      {/* Weight summary */}
      <div className="mt-5 space-y-2 text-sm">

        <p className="text-gray-600">
          Total Criteria: {criteria.length}
        </p>

        <p className="font-semibold text-gray-800">
          Total Weight: {totalWeight}%
        </p>

        {!hasValidTotal ? (
          <p className="font-medium text-amber-700">
            Warning: Criterion weights should total exactly 100%.
          </p>
        ) : (
          <p className="font-medium text-green-700">
            All criterion weights are valid.
          </p>
        )}

      </div>
    </div>
  );
}

export default CriteriaManager;
