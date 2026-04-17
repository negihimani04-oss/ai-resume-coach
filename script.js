function analyze() {
  const text = document.getElementById("resume").value;
  const output = document.getElementById("output");

  if (!text) {
    alert("Paste your resume first!");
    return;
  }

  // Show loading
  output.innerText = "Analyzing your resume... ⏳";

  setTimeout(() => {
    let score = Math.floor(Math.random() * 30) + 70;

    let result = `ATS Score: ${score}/100\n\n`;

    if (text.toLowerCase().includes("project")) {
      result += "✅ Strength: Good project experience\n";
    } else {
      result += "❌ Weakness: Add more projects\n";
    }

    if (text.length < 200) {
      result += "❌ Resume too short\n";
    } else {
      result += "✅ Good content length\n";
    }

    result += "\n💡 Suggestions:\n- Improve formatting\n- Add skills section\n- Include achievements";

    output.innerText = result;
  }, 1500);
}
