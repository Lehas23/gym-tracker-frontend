import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import MainLayout from "../components/MainLayout";

function SessionDetail() {
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
    <MainLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {session.templateName}
        </h1>
        {session.exercises.map((exercise) => (
          <div
            key={exercise.exerciseName}
            className="bg-white rounded-lg shadow-md p-6 mb-4"
          >
            <h2 className="font-semibold text-gray-900 mb-4">
              {exercise.exerciseName}
            </h2>
            <div className="flex gap-8 text-xs text-gray-500 font-medium mb-2">
              <span className="w-8">Set</span>
              <span className="w-16">Reps</span>
              <span className="w-16">Weight</span>
            </div>
            {exercise.sets.map((set) => (
              <div key={set.id} className="flex gap-8 items-center mb-2">
                <span className="w-8 text-sm text-gray-500">
                  {set.setNumber}
                </span>
                <span className="w-16 text-sm text-gray-900">{set.reps}</span>
                <span className="w-16 text-sm text-gray-900">
                  {set.weight}kg
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default SessionDetail;
