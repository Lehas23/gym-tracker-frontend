import { useState, useEffect } from "react";
import { useParams } from "react-router.dom";
import api from "../services/api";

function ActiveWorkout() {
  const [setEdits, setSetEdits] = useState({});
  const [session, setSession] = useState(null);
  const { sessionId } = useParams();

  useEffect(() => {
    fetchSession();
  }, []);

  async function fetchSession() {
    const response = await api.get(`/sessions/${sessionId}`);
    setSession(response.data);
  }

  if (!session) return <div>Loading...</div>;

  return (
    <div>
      <h1>{session.templateName}</h1>
      {session.exercises.map((exercise) => (
        <div key={exercise.exerciseName}>
          <h2>{exercise.exerciseName}</h2>
          {exercise.sets.map((set) => (
            <div key={set.id}>
              <p>
                Set {set.setNumber} - {set.reps} @ {set.weight}kg
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ActiveWorkout;
