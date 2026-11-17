
import { useState } from "react";
import type { Option } from "../types/decision";

interface OptionManagerProps {
  options: Option[];
  onChange: (options: Option[]) => void;
}

function OptionManager({ options, onChange }: OptionManagerProps) {
  const [newOption, setNewOption] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState("");

  // Add new option
  const addOption = () => {
    const trimmedName = newOption.trim();

    if (!trimmedName) {
      setError("Please enter an option name.");
      return;
    }

    const duplicate = options.some(
      (option) => option.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (duplicate) {
      setError("This option already exists.");
      return;
    }

    const newItem: Option = {
      id: crypto.randomUUID(),
      name: trimmedName,
    };

    onChange([...options, newItem]);
    setNewOption("");
    setError("");
  };

  // Start editing
  const startEditing = (option: Option) => {
    setEditingId(option.id);
    setEditName(option.name);
    setError("");
  };

  // Save edited option
  const saveOption = (id: string) => {
    const trimmedName = editName.trim();

    if (!trimmedName) {
      setError("Option name cannot be empty.");
      return;
    }

    const duplicate = options.some(
      (option) =>
        option.id !== id &&
        option.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (duplicate) {
      setError("This option already exists.");
      return;
    }

    const updatedOptions = options.map((option) =>
      option.id === id
        ? { ...option, name: trimmedName }
        : option
    );

    onChange(updatedOptions);
    setEditingId(null);
    setEditName("");
    setError("");
  };

  // Remove option
  const removeOption = (id: string) => {
    if (options.length <= 2) {
      setError("At least two options are required.");
      return;
    }

    onChange(options.filter((option) => option.id !== id));
    setError("");
  };

  return (
    <div>
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        Manage Options
      </h2>

      {/* Add option */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={newOption}
          onChange={(e) => {
            setNewOption(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") addOption();
          }}
          placeholder="Enter new option"
          className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={addOption}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Add Option
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p role="alert" className="mb-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Display options */}
      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 p-4"
          >
            {editingId === option.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => {
                    setEditName(e.target.value);
                    setError("");
                  }}
                  className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => saveOption(option.id)}
                    className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setError("");
                    }}
                    className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="flex-1 font-medium text-gray-800">
                  {option.name}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => startEditing(option)}
                    className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => removeOption(option.id)}
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

      <p className="mt-4 text-sm text-gray-600">
        Total Options: {options.length}
      </p>
    </div>
  );
}

export default OptionManager;
