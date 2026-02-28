const questions = [
  { text: "I enjoy solving complex problems.", type: "hacker" },
  { text: "I care about design and creativity.", type: "hipster" },
  { text: "I focus on finishing tasks quickly.", type: "hustler" }
];

let currentQuestion = 0;
let scores = {
  hacker: 0,
  hipster: 0,
  hustler: 0
};

const questionText = document.getElementById("questionText");
const stepText = document.getElementById("stepText");
const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");

function loadQuestion() {
  questionText.innerText = questions[currentQuestion].text;
  stepText.innerText = `Step ${currentQuestion + 1} of ${questions.length}`;
  progress.style.width =
    ((currentQuestion) / questions.length) * 100 + "%";
}

circles.forEach(circle => {
  circle.addEventListener("click", () => {

    circles.forEach(c => c.classList.remove("selected"));
    circle.classList.add("selected");

    let value = parseInt(circle.dataset.value);
    let type = questions[currentQuestion].type;

    scores[type] += value;

    setTimeout(() => {
      currentQuestion++;

      if (currentQuestion < questions.length) {
        loadQuestion();
        circles.forEach(c => c.classList.remove("selected"));
      } else {
        showResult();
      }
    }, 500);
  });
});

function showResult() {
  let result = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  document.querySelector(".container").innerHTML =
    `<h2>You are a ${result.toUpperCase()}!</h2>`;
}

loadQuestion();