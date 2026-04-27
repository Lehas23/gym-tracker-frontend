import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MainLayout from "../components/MainLayout";

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
    <MainLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">
          {session.templateName}
        </h1>
        <button
          onClick={() => {
            if (
              window.confirm("Are you sure you want to finish your session?")
            ) {
              fetchSession();
              setShowRecap(true);
            }
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors cursor-pointer"
        >
          Finish Session
        </button>

        {session.exercises.map((exercise) => (
          <div
            key={exercise.exerciseName}
            className="bg-white rounded-lg shadow-md p-6 mb-4"
          >
            <h2 className="font-semibold text-gray-900 mb-4">
              {exercise.exerciseName}
            </h2>
            <div className="flex gap-4 text-xs text-gray-500 font-medium mb-2 px-1">
              <span className="w-12">Set</span>
              <span className="w-24">Reps</span>
              <span className="w-24">Weight (kg)</span>
            </div>
            {exercise.sets.map((set) => (
              <div key={set.id} className="flex gap-4 items-center mb-2">
                <span className="w-12 text-sm text-gray-500">
                  {set.setNumber}
                </span>
                <input
                  type="number"
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
                  className="w-24 bg-gray-100 text-gray-900 p-2 rounded border border-gray-300 outline-none"
                />
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
                        setnumber: set.setNumber,
                      },
                    })
                  }
                  className="w-24 bg-gray-100 text-gray-900 p-2 rounded border border-gray-300 outline-none"
                />
                <button
                  onClick={() => handleUpdateSetDuringSession(set.id)}
                  className="text-blue-600 text-sm hover:underline cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDeleteSetDuringSession(set.id)}
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                >
                  X
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
              className="mt-2 text-blue-600 text-sm hover:underline cursor-pointer"
            >
              + Add Set
            </button>
          </div>
        ))}

        {showRecap && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Session Complete!
              </h2>
              <p className="text-gray-500 mb-6">{session.templateName}</p>
              {session.exercises.map((exercise) => (
                <div key={exercise.exerciseName} className="mb-4">
                  <h3 className="font-semibold text-gray-900">
                    {exercise.exerciseName}
                  </h3>
                  {exercise.sets.map((set) => (
                    <p key={set.id} className="text-sm text-gray-500 mt-1">
                      Set {set.setNumber} - {set.reps} reps @ {set.weight}kg
                    </p>
                  ))}
                </div>
              ))}
              <button
                onClick={() => navigate("/profile")}
                className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition-colors cursor-pointer mt-4"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default ActiveWorkout;
