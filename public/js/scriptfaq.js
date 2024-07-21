document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
  
      button.classList.toggle("active");
  
      if (button.classList.contains("active")) {
        answer.style.display = "block";
      } else {
        answer.style.display = "none";
      }
    });
  });
  