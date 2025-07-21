const API_URL = "https://opentdb.com/api.php?amount=10&category=26&difficulty=easy";
let questions = [];
let current = 0;
let score = 0;

const qEl = document.getElementById("question");
const countEl = document.getElementById("question-count");
const aEl = document.getElementById("answers");
const nextBtn = document.getElementById("next");
const restartBtn = document.getElementById("restart");
const scoreEl = document.getElementById("score");

function fetchQuestions() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      questions = data.results;
      current = 0;
      score = 0;
      scoreEl.textContent = "";
      restartBtn.style.display = "none";
      showQuestion();
    });
}

function showQuestion() {
  const q = questions[current];
  qEl.innerHTML = q.question;
  countEl.textContent = `Question ${current + 1} of ${questions.length}`;
  const answers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
  aEl.innerHTML = "";
  answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(btn, answer === q.correct_answer);
    aEl.appendChild(btn);
  });
  nextBtn.style.display = "none";
}

function selectAnswer(btn, correct) {
  if (correct) {
    score++;
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
  }
  Array.from(aEl.children).forEach(b => b.disabled = true);
  nextBtn.style.display = "inline";
  scoreEl.textContent = `Score: ${score}/${questions.length}`;
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    qEl.textContent = "Game Over";
    aEl.innerHTML = "";
    nextBtn.style.display = "none";
    restartBtn.style.display = "inline";
  }
};

restartBtn.onclick = () => {
  fetchQuestions();
};

fetchQuestions();
