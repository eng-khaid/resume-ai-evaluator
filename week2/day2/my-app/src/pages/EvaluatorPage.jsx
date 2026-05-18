import { useState } from "react";

function EvaluatorPage() {

  const [jobDescription, setJobDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");

  function handleSubmit(e) {
    e.preventDefault();

    if (jobDescription === "") {
      setStatus("error");
      return;
    }

    if (file === null) {
      setStatus("error");
      return;
    }

    setStatus("loading");
  }

  return (
    <div>
      <h2>Resume Evaluator</h2>

      <form onSubmit={handleSubmit}>

        <textarea
          placeholder="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>

        <textarea
          placeholder="Custom Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0] || null)}
        />

        <button type="submit">
          Evaluate Resume
        </button>

      </form>

      <div>

        {status === "idle" && <p>Fill in the form above.</p>}

        {status === "loading" && <p>Loading...</p>}

        {status === "error" && (
          <p style={{ color: "red" }}>
            Please fill all required fields.
          </p>
        )}

      </div>
    </div>
  );
}

export default EvaluatorPage;