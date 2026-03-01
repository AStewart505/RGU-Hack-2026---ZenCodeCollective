const questions = [
  // Section 1 (Q1–Q5)
  { text: "", type: "hacker" },
  { text: "", type: "hipster" },
  { text: "", type: "hustler" },
  { text: "", type: "hacker" },
  { text: "", type: "hipster" },

  // Section 2 (Q6–Q10)
  { text: "", type: "hustler" },
  { text: "", type: "hacker" },
  { text: "", type: "hipster" },
  { text: "", type: "hustler" },
  { text: "", type: "hacker" },

  // Section 3 (Q11–Q15)
  { text: "", type: "hipster" },
  { text: "", type: "hustler" },
  { text: "", type: "hacker" },
  { text: "", type: "hipster" },
  { text: "", type: "hustler" }
];

const QUESTIONS_PER_PAGE = 5;
const TOTAL_PAGES = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

let currentPage = 0; // 0,1,2

// Store answers 1..5 per question
let answers = new Array(questions.length).fill(null);

const quizContainer = document.getElementById("quiz");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const progress = document.getElementById("progress");
const pageIndicator = document.getElementById("pageIndicator"); // optional (exists in your HTML update)

function renderPage() {
  quizContainer.innerHTML = "";

  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length);

  // Optional page indicator (only works if the element exists)
  if (pageIndicator) {
    pageIndicator.innerText = `Page ${currentPage + 1} of ${TOTAL_PAGES}`;
  }

  // Render 5 questions
  for (let i = startIndex; i < endIndex; i++) {
    const q = questions[i];

    const block = document.createElement("div");
    block.classList.add("questionBlock");

    const qText = document.createElement("h2");
    qText.innerText = q.text || `Question ${i + 1} placeholder...`;

    const options = document.createElement("div");
    options.classList.add("options");

    const scale = document.createElement("div");
    scale.classList.add("scale");

    // Create 5 circles
    for (let value = 1; value <= 5; value++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      circle.setAttribute("data-value", value);

      // Restore selection
      if (answers[i] === value) {
        circle.classList.add("selected");
      }

      circle.addEventListener("click", () => {
        answers[i] = value;      // save answer
        renderPage();            // re-render to update selected state
      });

      scale.appendChild(circle);
    }

    // Labels under circles (always visible)
    const labels = document.createElement("div");
    labels.classList.add("labels");
    labels.innerHTML = `
      <span>Strongly<br>Disagree</span>
      <span>Disagree</span>
      <span>Neutral</span>
      <span>Agree</span>
      <span>Strongly<br>Agree</span>
    `;

    options.appendChild(scale);
    options.appendChild(labels);

    block.appendChild(qText);
    block.appendChild(options);

    quizContainer.appendChild(block);
  }

  updateProgress();
  updateButtons();
}

function updateButtons() {
  backBtn.style.display = currentPage === 0 ? "none" : "inline-block";

  const isLastPage = currentPage === TOTAL_PAGES - 1;
  nextBtn.style.display = isLastPage ? "none" : "inline-block";
  submitBtn.style.display = isLastPage ? "inline-block" : "none";
}

function updateProgress() {
  // progress based on pages (3 pages total)
  const percent = ((currentPage + 1) / TOTAL_PAGES) * 100;
  progress.style.width = percent + "%";
}

function pageAnswered(pageIndex) {
  const startIndex = pageIndex * QUESTIONS_PER_PAGE;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length);

  for (let i = startIndex; i < endIndex; i++) {
    if (answers[i] === null) return false;
  }
  return true;
}

// Next button (go to next page only if current page answered)
nextBtn.addEventListener("click", () => {
  if (!pageAnswered(currentPage)) {
    alert("Please answer all 5 questions before continuing.");
    return;
  }
  currentPage++;
  renderPage();
});

// Back button
backBtn.addEventListener("click", () => {
  currentPage--;
  renderPage();
});

// Submit button (only on last page)
submitBtn.addEventListener("click", () => {
  if (!pageAnswered(currentPage)) {
    alert("Please answer all 5 questions before submitting.");
    return;
  }
  calculateResult();
});

// Helper to display nice names if we ever need it
function titleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function calculateResult() {
  let scores = { hacker: 0, hipster: 0, hustler: 0 };

  answers.forEach((value, index) => {
    const type = questions[index].type;
    scores[type] += value; // value is 1..5
  });

  // Determine the max score and handle ties
  const maxScore = Math.max(scores.hacker, scores.hipster, scores.hustler);
  const topTypes = Object.keys(scores).filter(t => scores[t] === maxScore);

  let finalCharacter = "";

  // 3-way tie -> Unicorn
  if (topTypes.length === 3) {
    finalCharacter = "Unicorn";
  }
  // 2-way tie -> combos
  else if (topTypes.length === 2) {
    const pair = topTypes.sort().join("+");

    const comboMap = {
      "hacker+hustler": "Growth Hacker",
      "hacker+hipster": "Tech Hipster",
      "hipster+hustler": "Creative Entrepreneur"
    };

    finalCharacter = comboMap[pair] || topTypes.map(titleCase).join(" & ");
  }
  // Single winner -> base character
  else {
    finalCharacter = titleCase(topTypes[0]); // Hacker / Hipster / Hustler
  }

  document.querySelector(".container").innerHTML = `
    <h2>You are a ${finalCharacter}!</h2>
    <p>Your scores:</p>
    <p>Hacker: ${scores.hacker}</p>
    <p>Hipster: ${scores.hipster}</p>
    <p>Hustler: ${scores.hustler}</p>
  `;
}

// Initial render
renderPage();