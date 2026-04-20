async function analyze() {
  const text = document.getElementById("resume").value;
  const output = document.getElementById("output");

  if (!text) {
    output.innerText = "Please paste your resume first!";
    return;
  }

  output.innerText = "Analyzing... ⏳";

  const prompt = `
Analyze this resume and provide:

1. ATS Score (out of 100)
2. Strengths
3. Weaknesses
4. Suggestions for improvement
5. 5 Interview Questions

Resume:
${text}
`;

  try {
    const response = await fetch("https://ai-resume-coach-676938536113.asia-south1.run.app/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: prompt })
    });

    const data = await response.json();

    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";

    output.innerHTML = `<pre>${result}</pre>`;

  } catch (error) {
    output.innerText = "Error connecting to AI.";
  }
}
