function EvaluatorPage() {
  return (
    <main className="evaluator-page">
      <h2>Evaluation Setup</h2>

      <form className="evaluation-form">
        <div>
          <label>Job Description</label>
          <textarea placeholder="Paste job description..." />
        </div>

        <div>
          <label>Prompt</label>
          <textarea placeholder="Enter AI prompt..." />
        </div>

        <div>
          <label>Upload File</label>
          <input type="file" />
        </div>

        <button type="submit">Submit</button>
      </form>

      <h3>Results</h3>
      <p>Results will appear here</p>
    </main>
  );
}

export default EvaluatorPage;