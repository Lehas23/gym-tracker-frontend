import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateTemplate() {
  const [templateName, setTemplateName] = useState("");
  const [selectExercises, setSelectExercises] = useState([]);
  const [searchExercise, setSearchExercise] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [pendingExercise, setPendingExercise] = useState(null);
  const navigate = useNavigate();

  async function handleCreateTemplate() {
    const response = await api.post("/templates", {
      name: templateName,
      exercises: selectExercises,
    });
    navigate("/templates");
  }

  async function handleExerciseSearch() {
    const response = await api.get(`/exercises?search=${searchExercise}`);

    setSearchResult(response.data);
  }

  function handleAddExercise(exercise) {
    setPendingExercise({
      exerciseId: exercise.id,
      name: exercise.name,
      defaultSets: 3,
      defaultReps: 8,
      defaultWeight: 0,
    });
  }

  function handleConfirmExercise() {
    setSelectExercises([...selectExercises, pendingExercise]);
    setPendingExercise(null);
  }

  function handleRemoveExercise(exercise) {
    setSelectExercises(
      selectExercises.filter((e) => e.exerciseId !== exercise.exerciseId),
    );
  }

  return (
    <div>
      <h1>Create Template</h1>

      <input
        type="text"
        placeholder="Template Title"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Search Exercises"
        value={searchExercise}
        onChange={(e) => {
          setSearchExercise(e.target.value);
          handleExerciseSearch();
        }}
      />
      <h3>Selected Exercises</h3>
      {selectExercises.map((exercise, index) => (
        <div key={index}>
          <span>{exercise.name}</span>
          <button onClick={() => handleRemoveExercise(exercise)}>Remove</button>
        </div>
      ))}
      {searchResult.map((exercise) => (
        <div key={exercise.id}>
          <p>
            {exercise.name} - {exercise.muscleGroup}
          </p>
          <button onClick={() => handleAddExercise(exercise)}>Add</button>
        </div>
      ))}

      {pendingExercise && (
        <div>
          <h3>Configure {pendingExercise.name}</h3>
          <label>Sets</label>
          <input
            type="number"
            value={pendingExercise.defaultSets}
            onChange={(e) =>
              setPendingExercise({
                ...pendingExercise,
                defaultSets: Number(e.target.value),
              })
            }
          />
          <label>Reps</label>
          <input
            type="number"
            value={pendingExercise.defaultReps}
            onChange={(e) =>
              setPendingExercise({
                ...pendingExercise,
                defaultReps: Number(e.target.value),
              })
            }
          />
          <label>Weight (kg)</label>
          <input
            type="number"
            value={pendingExercise.defaultWeight}
            onChange={(e) =>
              setPendingExercise({
                ...pendingExercise,
                defaultWeight: Number(e.target.value),
              })
            }
          />
          <button onClick={handleConfirmExercise}>Confirm</button>
          <button onClick={() => setPendingExercise(null)}>Cancel</button>
          <button onClick={() => handleRemoveExercise(exercise)}>Remove</button>
        </div>
      )}

      <button onClick={handleCreateTemplate}>Create Template</button>
    </div>
  );
}

export default CreateTemplate;
