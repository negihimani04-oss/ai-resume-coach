async function analyze() {
  const text = document.getElementById("resume").value;
  const output = document.getElementById("output");

  if (!text) {
    output.innerText = "Please paste your resume first!";
    return;
  }

  output.innerText = "Analyzing... ⏳";

  try {
    const response = await fetch("https://console.cloud.google.com/home/dashboard?project=ai-resume-coach-493412/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();

    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";

    output.innerText = result;

  } catch (error) {
    output.innerText = "Error connecting to AI.";
  }
}
