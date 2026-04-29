import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MainLayout from "../components/MainLayout";

function Profile() {
  const [sessions, setSessions] = useState([]);
  const [sessionCount, setSessionCount] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    displayLast10Sessions();
    fetchSessionCount();
  }, []);

  async function displayLast10Sessions() {
    const response = await api.get("/sessions");
    setSessions(response.data);
  }

  async function fetchSessionCount() {
    const response = await api.get("/sessions/count");
    setSessionCount(response.data);
  }

  return (
    <MainLayout>
      <div>
        <div className="max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {user.email}
                </p>
              </div>
              <button
                onClick={() => navigate("/settings")}
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                Edit Profile
              </button>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {sessionCount}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                Workouts
              </span>
            </div>
          </div>
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => navigate(`/sessions/${session.id}`)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {session.templateName}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {session.date}
              </p>
              {session.exercises.map((exercise) => (
                <p
                  className="text-sm text-gray-500 dark:text-gray-400 mt-1"
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
