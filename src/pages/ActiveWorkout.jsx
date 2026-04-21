import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function ActiveWorkout() {
  const [setEdits, setSetEdits] = useState({});
  const [session, setSession] = useState(null);
  const [showRecap, setShowRecap] = useState(false);
  const { sessionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSession();
  }, []);

  async function fetchSession() {
    const response = await api.get(`/sessions/${sessionId}`);
    setSession(response.data);
  }

  if (!session) return <div>Loading...</div>;

  async function handleAddSetDuringSession(exerciseId, setCount) {
    const response = await api.post(`/sessions/${sessionId}/sets`, {
      exerciseId: exerciseId,
      reps: 8,
      weight: 0,
      setNumber: setCount + 1,
    });
    fetchSession();
  }

  async function handleUpdateSetDuringSession(setId) {
    const edit = setEdits[setId];
    const response = await api.put(`/sessions/${sessionId}/sets/${setId}`, {
      reps: edit.reps,
      weight: edit.weight,
      setNumber: edit.setNumber,
    });
  }

  async function handleDeleteSetDuringSession(setId) {
    await api.delete(`/sessions/${sessionId}/sets/${setId}`);

    fetchSession();
  }

  return (
    <div>
      <h1>{session.templateName}</h1>
      {session.exercises.map((exercise) => (
        <div key={exercise.exerciseName}>
          <h2>{exercise.exerciseName}</h2>
          {exercise.sets.map((set) => (
            <div key={set.id}>
              <p>Set {set.setNumber}</p>
              <label>Reps</label>
              <input
                type="number"
                placeholder="Reps"
                value={setEdits[set.id]?.reps ?? set.reps}
                onChange={(e) =>
                  setSetEdits({
                    ...setEdits,
                    [set.id]: {
                      ...setEdits[set.id],
                      reps: Number(e.target.value),
                      weight: setEdits[set.id]?.weight ?? set.weight,
                      setNumber: set.setNumber,
                    },
                  })
                }
              />
              <label>Weight (kg)</label>
              <input
                type="number"
                value={setEdits[set.id]?.weight ?? set.weight}
                onChange={(e) =>
                  setSetEdits({
                    ...setEdits,
                    [set.id]: {
                      ...setEdits[set.id],
                      weight: Number(e.target.value),
                      reps: setEdits[set.id]?.reps ?? set.reps,
                      setNumber: set.setNumber,
                    },
                  })
                }
              />
              <button onClick={() => handleUpdateSetDuringSession(set.id)}>
                Save
              </button>
              <button onClick={() => handleDeleteSetDuringSession(set.id)}>
                Delete
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              handleAddSetDuringSession(
                exercise.exerciseId,
                exercise.sets.length,
              )
            }
          ></button>

          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to finish your session?")
              ) {
                fetchSession();
                setShowRecap(true);
              }
            }}
          >
            Finish Session
          </button>
        </div>
      ))}
      {showRecap && (
        <div>
          <h2>Session Complete!</h2>
          <p>{session.templateName}</p>
          {session.exercises.map((exercise) => (
            <div key={exercise.exerciseName}>
              <h3>{exercise.exerciseName}</h3>
              {exercise.sets.map((set) => (
                <p key={set.id}>
                  Set {set.setNumber} - {set.reps} reps @ {set.weight}kg
                </p>
              ))}
            </div>
          ))}
          <button onClick={() => navigate("/profile")}>Done</button>
        </div>
      )}
    </div>
  );
}

export default ActiveWorkout;
