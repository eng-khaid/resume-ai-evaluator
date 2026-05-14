const form =
document.getElementById("resume-form");

form.addEventListener("submit", function(event){

event.preventDefault();

const jobDescription =
document.getElementById("job-description").value;

const customPrompt =
document.getElementById("custom-prompt").value;

const fileInput =
document.getElementById("resume");

const results =
document.getElementById("results");

/* VALIDATION */

if(jobDescription.trim() === ""){

results.textContent =
"Please enter a job description.";

return;
}

if(fileInput.files.length === 0){

results.textContent =
"Please upload a PDF resume.";

return;
}

/* FILE NAME */

const fileName =
fileInput.files[0].name;

/* OUTPUT */

results.innerHTML = `
<h3>Evaluation Started</h3>

<p>
Evaluating <strong>${fileName}</strong>
against the job description.
</p>

<p>
ChatGPT integration coming in Stage 5.
</p>
`;

});