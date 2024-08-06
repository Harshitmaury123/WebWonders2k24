let selected = "";
let presentQuestion = 1;
let score = 0;
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("option")) {
    handleOptionclick(event.target);
  } else if (event.target.classList.contains("option-selected")) {
    handleOptionSelect(event.target);
  }
});
const submit = () => {
  document.cookie = score=${score};
  document.location.href = "/result.html";
};
const renderQuestion = () => {
  selected = "";
  toggleNext();
  resetOptions();
  document.querySelector(
    ".question-total"
  ).innerText = ${presentQuestion} of 5 questions;;
  document.querySelector(".header-score").innerText = Score:${score} / 100;
  document.querySelector(".question-text").innerText =
    questions[presentQuestion - 1]["question"];

  document.getElementById("A").innerText =
    questions[presentQuestion - 1]["options"][0];
  document.getElementById("B").innerText =
    questions[presentQuestion - 1]["options"][1];
  document.getElementById("C").innerText =
    questions[presentQuestion - 1]["options"][2];
  document.getElementById("D").innerText =
    questions[presentQuestion - 1]["options"][3];
  if (presentQuestion == 5) {
    document.getElementById("btn").innerText = "Submit";
  }
};
const resetOptions = () => {
  let el = document.querySelector(".option-selected");
  el.classList.remove("option-selected");
  el.classList.add("option");
};
let next = document.querySelector(".quiz-footer");
next.addEventListener("click", () => {
  let btn = document.getElementById("btn");
  if (btn.disabled) return;

  if (selected == questions[presentQuestion - 1]["answer"]) {
    displayCorrectAnswer();
  } else {
    displayWrongAnswer();
  }
});
const handleOptionclick = (opt) => {
  let id = opt.id;
  opt.classList.add("option-selected");
  opt.classList.remove("option");
  if (selected == "") {
    toggleNext();
  }
  if (selected != "") {
    let el = document.getElementById(selected);
    el.classList.add("option");
    el.classList.remove("option-selected");
  }
  selected = id;
};
const handleOptionSelect = (opt) => {
  let id = opt.id;
  opt.classList.add("option");
  opt.classList.remove("option-selected");
  if (id == selected) {
    toggleNext();
    selected = "";
  }
};
const toggleNext = () => {
  let next = document.querySelector(".next-btn");
  next.classList.toggle("next-active");
  next.disabled = !next.disabled;
};

const displayCorrectAnswer = () => {
  let el = document.getElementById(selected);
  el.classList.add("option-correct");
  setTimeout(() => {
    el.classList.remove("option-correct");
    score += 20;
    if (presentQuestion == 5) {
      submit();
      return;
    }
    presentQuestion++;
    renderQuestion();
  }, 1300);
};
const displayWrongAnswer = () => {
  let cOpt = questions[presentQuestion - 1]["answer"];
  let correctEl = document.getElementById(cOpt);
  let wrongEl = document.getElementById(selected);

  correctEl.classList.add("option-correct");
  wrongEl.classList.add("option-wrong");
  setTimeout(() => {
    correctEl.classList.remove("option-correct");
    wrongEl.classList.remove("option-wrong");
    if (presentQuestion == 5) {
      submit();
      return;
    }
    presentQuestion++;

    renderQuestion();
  }, 1300);
};
