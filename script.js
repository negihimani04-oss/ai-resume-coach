async function analyze() {
  const text = document.getElementById("resume").value;
  const output = document.getElementById("output");

  if (!text) {
    output.innerText = "Please paste your resume first!";
    return;
  }

  output.innerText = "Analyzing with AI... ⏳";

  const prompt = `
Analyze this resume and provide:

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
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-001:generateContent?key=AIzaSyC1T1shb9G6RRC9C7Odbrb7uFYsH0R8gdQ",
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

    // 🔍 Check if request failed
    if (!response.ok) {
      const errorText = await response.text();
      output.innerText = "API Error: " + errorText;
      return;
    }

    const data = await response.json();
    console.log("FULL RESPONSE:", data);

    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!result) {
      output.innerText = "No valid AI response received.";
      return;
    }

    output.innerHTML = `<pre>${result}</pre>`;

  } catch (error) {
    console.error("ERROR:", error);
    output.innerText = "Connection failed. Check internet or API.";
  }
}
