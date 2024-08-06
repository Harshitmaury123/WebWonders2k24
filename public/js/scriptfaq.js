document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    if (answer.classList.contains("faq-answer-selected")) {
      answer.classList.remove("faq-answer-selected");
    } else {
      document.querySelectorAll(".faq-answer").forEach((el) => {
        el.classList.remove("faq-answer-selected");
      });
      answer.classList.add("faq-answer-selected");
    }
  });
});

