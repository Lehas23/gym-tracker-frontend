import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MainLayout from "../components/MainLayout";

function TemplateDetail() {
  const [template, setTemplate] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplate();
  }, []);

  async function fetchTemplate() {
    console.log(`Fetching: /templates/${id}`);
    const response = await api.get(`/templates/${id}`);
    setTemplate(response.data);
  }

  async function handleStartSession() {
    const response = await api.post(`/sessions/${id}`);
    navigate(`/active-workout/${response.data.id}`);
  }

  async function handleDeleteTemplate() {
    await api.delete(`/templates/${id}`);
    navigate("/templates");
  }

  if (!template) return <div>Loading...</div>;

  return (
    <MainLayout>
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {template.name}
            </h1>
            <button
              onClick={handleStartSession}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Start Session
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {template.templateExercises.map((te) => (
            <div key={te.id} className="mb-4">
              <p className="font-semibold text-gray-900">{te.exercise.name}</p>
              <p className="text-sm text-gray-500">
                {te.defaultSets} sets x {te.defaultReps} reps @{" "}
                {te.defaultWeight}kg
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors cursor-pointer">
            Edit Template
          </button>
          <button
            onClick={handleDeleteTemplate}
            className="border border-red-300 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition-colors cursor-pointer"
          >
            Delete Template
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default TemplateDetail;
