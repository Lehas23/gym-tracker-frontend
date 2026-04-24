import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MainLayout from "../components/MainLayout";

function Profile() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    displayLast10Sessions();
  }, []);

  async function displayLast10Sessions() {
    const response = await api.get("/sessions");

    setSessions(response.data);
  }

  return (
    <MainLayout>
      <div>
        <div className="max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors cursor-pointer">
                Edit Profile
              </button>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">
                {sessions.length}
              </span>
              <span className="text-gray-500 text-sm ml-1">Workouts</span>
            </div>
          </div>
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => navigate(`/sessions/${session.id}`)}
              className="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-bold text-gray-900">
                {session.templateName}
              </h3>
              <p className="text-gray-500 text-sm">{session.date}</p>
              {session.exercises.map((exercise) => (
                <p
                  className="text-sm text-gray-500 mt-1"
                  key={exercise.exerciseName}
                >
                  {exercise.sets.length} sets {exercise.exerciseName}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;
