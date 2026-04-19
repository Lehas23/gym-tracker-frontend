import { useState } from "react";
import { useEffect } from "react";
import api from "../services/api";

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [templateName, setTemplateName] = useState("");

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    const response = await api.get("/templates");

    setTemplates(response.data);
  }

  async function handleCreateTemplate() {
    const response = await api.post("/templates", {
      name: templateName,
      exercises: [],
    });

    await fetchTemplates();
  }

  return (
    <div>
      <h1>Templates</h1>
      {templates.map((template) => (
        <div key={template.id}>
          <p>{template.name}</p>
        </div>
      ))}

      <input
        type="text"
        placeholder="Template Name"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
      />

      <br />

      <button onClick={handleCreateTemplate}>Create Template</button>
    </div>
  );
}

export default Templates;
