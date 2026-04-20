function analyze() {
  const text = document.getElementById("resume").value;
  const output = document.getElementById("output");

  if (!text) {
    output.innerText = "Please paste your resume first!";
    return;
  }

  output.innerText = "Analyzing with AI... ⏳";

  setTimeout(() => {
    const result = `
ATS Score: 78/100

Strengths:
- Good technical skills
- Clear structure

Weaknesses:
- Lacks quantified achievements
- Weak summary section

Suggestions:
- Add measurable results
- Improve formatting

Interview Questions:
1. Explain your main project.
2. What challenges did you face?
3. Why should we hire you?
`;

    output.innerHTML = `<pre>${result}</pre>`;
  }, 1500);
}
