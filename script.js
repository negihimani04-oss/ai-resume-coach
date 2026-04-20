async function analyze() {
  const text = document.getElementById("resume").value;
  const output = document.getElementById("output");

  if (!text) {
    output.innerText = "Please paste your resume first!";
    return;
  }

  output.innerText = "Analyzing with AI... ⏳";

  const prompt = `
You are an ATS Resume Analyzer.

Analyze the resume and give output in this format:

ATS Score: (out of 100)

Strengths:
- point 1
- point 2

Weaknesses:
- point 1
- point 2

Suggestions:
- point 1
- point 2

Interview Questions:
1. Question
2. Question
3. Question

Resume:
${text}
`;

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    const result = data.candidates[0].content.parts[0].text;

    output.innerHTML = `<pre>${result}</pre>`;

  } catch (error) {
    output.innerText = "Error analyzing resume.";
  }
}
