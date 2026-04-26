import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MainLayout from "../components/MainLayout";

function CreateTemplate() {
  const [templateName, setTemplateName] = useState("");
  const [selectExercises, setSelectExercises] = useState([]);
  const [searchExercise, setSearchExercise] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  async function handleCreateTemplate() {
    const response = await api.post("/templates", {
      name: templateName,
      exercises: selectExercises.map((e) => ({
        exerciseId: e.exerciseId,
        defaultSets: e.sets.length,
        defaultReps: e.sets[0].reps,
        defaultWeight: e.sets[0].weight,
      })),
    });
    navigate("/templates");
  }

  async function handleExerciseSearch() {
    const response = await api.get(`/exercises?search=${searchExercise}`);

    setSearchResult(response.data);
  }

  function handleAddExercise(exercise) {
    setSelectExercises([
      ...selectExercises,
      {
        exerciseId: exercise.id,
        name: exercise.name,
        sets: [{ setNumber: 1, reps: 8, weight: 0 }],
      },
    ]);
  }

  function handleAddSet(exerciseIndex) {
    const updated = [...selectExercises];
    const exercise = updated[exerciseIndex];
    exercise.sets.push({
      setNumber: exercise.sets.length + 1,
      reps: 8,
      weight: 0,
    });
    setSelectExercises(updated);
  }

  function handleUpdateSet(exerciseIndex, setIndex, field, value) {
    const updated = [...selectExercises];
    updated[exerciseIndex].sets[setIndex][field] = Number(value);
    setSelectExercises(updated);
  }

  function handleRemoveSet(exerciseIndex, setIndex) {
    const updated = [...selectExercises];
    updated[exerciseIndex].sets.splice(setIndex, 1);
    // renumber sets
    updated[exerciseIndex].sets.forEach((set, i) => (set.setNumber = i + 1));
    setSelectExercises(updated);
  }

  function handleRemoveExercise(exercise) {
    setSelectExercises(
      selectExercises.filter((e) => e.exerciseId !== exercise.exerciseId),
    );
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-6">
        <div className="max-w-6xl mx-auto flex gap-6 px-4">
          {/* Left side */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/templates")}
                  className="text-gray-500 hover:text-gray-900 cursor-pointer"
                >
                  ←
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  Create Template
                </h1>
              </div>
              <button
                onClick={handleCreateTemplate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Save Template
              </button>
            </div>

            <div className="mb-6 max-w-md">
              <input
                type="text"
                placeholder="Template Name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="w-full bg-white text-gray-900 p-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>

            {selectExercises.map((exercise, exerciseIndex) => (
              <div
                key={exercise.exerciseId}
                className="bg-white rounded-lg shadow-md p-6 mb-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    {exercise.name}
                  </h3>
                  <button
                    onClick={() => handleRemoveExercise(exercise)}
                    className="text-red-500 text-sm hover:underlin cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex gap-4 text-xs text-gray-500 font-medium mb-2 px-1">
                  <span className="w-12">Set</span>
                  <span className="w-24">Reps</span>
                  <span className="w-24">Weight (kg)</span>
                </div>
                {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex} className="flex gap-4 items-center mb-2">
                    <span className="w-12 text-sm text-gray-500">
                      {set.setNumber}
                    </span>
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) =>
                        handleUpdateSet(
                          exerciseIndex,
                          setIndex,
                          "reps",
                          e.target.value,
                        )
                      }
                      className="w-24 bg-gray-100 text-gray-900 p-2 rounded border border-gray-300 outline-none"
                    />
                    <input
                      type="number"
                      value={set.weight}
                      onChange={(e) =>
                        handleUpdateSet(
                          exerciseIndex,
                          setIndex,
                          "weight",
                          e.target.value,
                        )
                      }
                      className="w-24 bg-gray-100 text-gray-900 p-2 rounded border border-gray-300 outline-none"
                    />
                    <button
                      onClick={() => handleRemoveSet(exerciseIndex, setIndex)}
                      className="text-red-400 hover:text-red-600 cursor-pointer"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddSet(exerciseIndex)}
                  className="mt-2 text-blue-600 text-sm hover:underline cursor-pointer"
                >
                  + Add Set
                </button>
              </div>
            ))}
          </div>

          {/* Right side - Exercise Library */}
          <div className="w-80">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Exercise Library
              </h2>
              <input
                type="text"
                placeholder="Search Exercises"
                value={searchExercise}
                onChange={(e) => {
                  setSearchExercise(e.target.value);
                  handleExerciseSearch();
                }}
                className="w-full bg-gray-100 text-gray-900 p-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {searchResult.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded mb-2"
                  >
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {exercise.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {exercise.muscleGroup}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddExercise(exercise)}
                      className="bg-blue-600 text-white w-7 h-7 rounded-full hover:bg-blue-700 transition-colors cursor-pointer text-lg leading-none"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CreateTemplate;
