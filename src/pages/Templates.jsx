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
      <div>
        <h1>Templates</h1>
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => navigate(`/templates/${template.id}`)}
          >
            <p>{template.name}</p>
          </div>
        ))}

        <button onClick={() => navigate("/create-template")}>
          Create Template
        </button>
      </div>
    </MainLayout>
  );
}

export default Templates;
