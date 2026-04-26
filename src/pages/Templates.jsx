import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MainLayout from "../components/MainLayout";

function Templates() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    const response = await api.get("/templates");

    setTemplates(response.data);
  }

  return (
    <MainLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
          <button
            onClick={() => navigate("/create-template")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition colors cursor-pointer"
          >
            Create Template
          </button>
        </div>
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => navigate(`/templates/${template.id}`)}
            className="bg-white rounded-lg shadow-md p-6 mb-4 cursor pointer hover:shadow-lg transiton shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {template.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {template.templateExercises.length} exercises
            </p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Templates;
