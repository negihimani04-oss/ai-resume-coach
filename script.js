async function analyze() {
  const text = document.getElementById("resume").value;
  const output = document.getElementById("output");

  if (!text) {
    alert("Paste your resume first!");
    return;
  }

  output.innerText = "Analyzing with AI... ⏳";

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this resume and give ATS score, strengths, weaknesses, and suggestions:\n\n${text}`
          }]
        }]
      })
    });

    const data = await response.json();

    const result = data.candidates[0].content.parts[0].text;
    output.innerText = result;

  } catch (error) {
    output.innerText = "Error analyzing resume.";
  }
}
