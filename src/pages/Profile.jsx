import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    displayLast10Sessions();
  }, []);

  async function displayLast10Sessions() {
    const response = await api.get("/sessions");

    setSessions(response.data);
  }

  return (
    <div>
      <h1>Profile</h1>
      {sessions.map((session) => (
        <div
          key={session.id}
          onClick={() => navigate(`/sessions/${session.id}`)}
        >
          <h3>{session.templateName}</h3>
          <p>{session.date}</p>
          {session.exercises.map((exercise) => (
            <p key={exercise.exerciseName}>
              {exercise.sets.length} sets {exercise.exerciseName}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Profile;
