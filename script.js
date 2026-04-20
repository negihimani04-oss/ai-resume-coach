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

Analyze the resume and provide:

ATS Score (out of 100)
Strengths
Weaknesses
Suggestions
Interview Questions

Resume:
${text}
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC1T1shb9G6RRC9C7Odbrb7uFYsH0R8gdQ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      }
    );

    const data = await response.json();

    console.log("API RESPONSE:", data); // 🔍 IMPORTANT

    if (!response.ok) {
      output.innerText = "API Error: " + JSON.stringify(data);
      return;
    }

    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";

    output.innerHTML = `<pre>${result}</pre>`;

  } catch (error) {
    console.error(error);
    output.innerText = "Error connecting to AI.";
  }
}
