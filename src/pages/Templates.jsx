import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MainLayout from "../components/MainLayout";

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    const response = await api.get("/templates");

    setTemplates(response.data);
  }

  async function handleStartSession(templateId) {
    const response = await api.post(`/sessions/${templateId}`);
    navigate(`/active-workout/${response.data.id}`);
  }

  async function handleDeleteTemplate(templateId) {
    await api.delete(`/templates/${templateId}`);
    setSelectedTemplate(null);
    fetchTemplates();
  }

  return (
    <MainLayout>
      <div>
        <h1>Templates</h1>
        {templates.map((template) => (
          <div key={template.id} onClick={() => setSelectedTemplate(template)}>
            <p>{template.name}</p>
          </div>
        ))}

        <button onClick={() => navigate("/create-template")}>
          Create Template
        </button>

        {selectedTemplate && (
          <div>
            <h2>{selectedTemplate.name}</h2>
            <button onClick={() => handleStartSession(selectedTemplate.id)}>
              Start Session
            </button>
            <button>Edit template</button>
            <button onClick={() => handleDeleteTemplate(selectedTemplate.id)}>
              Delete Template
            </button>
            <button onClick={() => setSelectedTemplate(null)}>Close</button>
            {selectedTemplate.templateExercises.map((te) => (
              <div key={te.id}>
                <p>
                  {te.exercise.name} - {te.defaultSets} sets x {te.defaultReps}{" "}
                  reps @ {te.defaultWeight}kg
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Templates;
