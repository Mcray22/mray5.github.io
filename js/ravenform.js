document.addEventListener("DOMContentLoaded", () => {
  const ravenForm = document.getElementById("contact-form");
  const scrollShell = document.getElementById("scroll-shell");
  const confirmation = document.getElementById("raven-confirmation");
  const ravenFlight = document.getElementById("raven-flight");

  if (!ravenForm || !scrollShell || !confirmation || !ravenFlight) return;

  ravenForm.addEventListener("submit", (event) => {
    event.preventDefault();

    scrollShell.classList.add("is-submitted");

    setTimeout(() => {
      scrollShell.classList.add("is-rolling");
    }, 500);

    setTimeout(() => {
      scrollShell.classList.add("has-ribbon");
    }, 1300);

    setTimeout(() => {
      scrollShell.classList.add("has-seal");
    }, 1700);

    setTimeout(() => {
      scrollShell.classList.add("is-picked-up");
    }, 2100);

    setTimeout(() => {
      ravenFlight.classList.add("is-flying");
    }, 2300);

    setTimeout(() => {
      confirmation.classList.add("show");
    }, 4200);
  });
});


  // ========================================
  // SEND A RAVEN PAGE
  // PURPOSE: Reserved for future scroll/raven animation hooks
  // ========================================
  const ravenForm = document.getElementById("contact-form");
  const scrollShell = document.getElementById("scroll-shell");
  const ravenFlight = document.getElementById("raven-flight");
  const ravenConfirmation = document.getElementById("raven-confirmation");

  if (ravenForm && scrollShell) {
    ravenForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Placeholder for future animation sequence
      console.log("Raven animation hook ready.");
    });
  }