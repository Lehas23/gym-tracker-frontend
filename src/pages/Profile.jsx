import { useState } from "react";
import { useEffect } from "react";
import api from "../services/api";

function Profile() {
  const [sessions, setSessions] = useState([]);

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
        <div key={session.id}>
          <p>{session.date}</p>
          <p>{session.templateName}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;
