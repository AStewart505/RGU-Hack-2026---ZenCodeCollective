const questions = [
  { text: "I enjoy solving complex problems.", type: "hacker" },
  { text: "I care about design and creativity.", type: "hipster" },
  { text: "I focus on finishing tasks quickly.", type: "hustler" }
];

let currentQuestion = 0;

// Store selected answers (null at start)
let answers = new Array(questions.length).fill(null);

const questionText = document.getElementById("questionText");
const stepText = document.getElementById("stepText");
const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {

  questionText.innerText = questions[currentQuestion].text;
  stepText.innerText = `Step ${currentQuestion + 1} of ${questions.length}`;

  progress.style.width =
    ((currentQuestion) / questions.length) * 100 + "%";

  // Clear selection
  circles.forEach(c => c.classList.remove("selected"));

  // Restore previous selection if exists
  if (answers[currentQuestion] !== null) {
    circles[answers[currentQuestion] - 1].classList.add("selected");
  }

  // Hide Back button on first question
  backBtn.style.display = currentQuestion === 0 ? "none" : "inline";

  // Change button text on last question
  nextBtn.innerText =
    currentQuestion === questions.length - 1 ? "Submit" : "Next";
}

// When user selects a circle
circles.forEach(circle => {
  circle.addEventListener("click", () => {

    circles.forEach(c => c.classList.remove("selected"));
    circle.classList.add("selected");

    answers[currentQuestion] = parseInt(circle.dataset.value);
  });
});

// Next / Submit button
nextBtn.addEventListener("click", () => {

  if (answers[currentQuestion] === null) {
    alert("Please select an answer before continuing.");
    return;
  }

  if (currentQuestion === questions.length - 1) {
    calculateResult();
  } else {
    currentQuestion++;
    loadQuestion();
  }
});

// Back button
backBtn.addEventListener("click", () => {
  currentQuestion--;
  loadQuestion();
});

function calculateResult() {

  let scores = {
    hacker: 0,
    hipster: 0,
    hustler: 0
  };

  answers.forEach((value, index) => {
    let type = questions[index].type;
    scores[type] += value;
  });

  let result = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  document.querySelector(".container").innerHTML =
    `<h2>You are a ${result.toUpperCase()}!</h2>
     <p>Your scores:</p>
     <p>Hacker: ${scores.hacker}</p>
     <p>Hipster: ${scores.hipster}</p>
     <p>Hustler: ${scores.hustler}</p>`;
}

loadQuestion();