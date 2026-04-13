document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star-rating span");
  const ratingInput = document.getElementById("rating");
  const ratingForm = document.getElementById("ratingForm");

  if (!stars.length || !ratingInput || !ratingForm) {
    return;
  }

  // Handle star clicks
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = star.getAttribute("data-value");
      ratingInput.value = value;

      stars.forEach((s) => s.classList.remove("selected"));
      star.classList.add("selected");
    });
  });

  // Handle form submission
  ratingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (ratingInput.value === "") {
      alert("Please select a rating before submitting.");
      return;
    }

    alert("Your tale has been recorded in the chronicles ⚔️");

    ratingForm.reset();
    ratingInput.value = "";
    stars.forEach((s) => s.classList.remove("selected"));
  });
});