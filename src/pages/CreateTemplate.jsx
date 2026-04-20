import { useState, useEffect } from "react";
import api from "../services/api";

function CreateTemplate() {
  const [templateName, setTemplateName] = useState("");
  const [selectExercises, setSelectExercises] = useState([]);
  const [searchExercise, setSearchExercise] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  async function handleCreateTemplate() {
    const response = await api.post("/templates", {
      name: templateName,
      exercises: selectExercises,
    });
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
        defaultSets: 3,
        defaultReps: 8,
        defaultWeight: 0,
      },
    ]);
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
          <p>{exercise.name}</p>
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

      <button onClick={handleCreateTemplate}>Create Template</button>
    </div>
  );
}

export default CreateTemplate;
