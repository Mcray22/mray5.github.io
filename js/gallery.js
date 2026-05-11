// Wait until the HTML is fully loaded before running JavaScript
  // ========================================
  // WIZARD'S TOWER GALLERY SETUP
  // PURPOSE: Set active thumbnail on page load
  // ========================================
  const firstWizardThumbnail = document.querySelector(".thumbnail-row img");
  if (firstWizardThumbnail) {
    firstWizardThumbnail.classList.add("active-thumbnail");
  }



// ========================================
// WIZARD'S TOWER GALLERY FUNCTION
// PURPOSE: Swap image, title, description,
// and active thumbnail state
// ========================================
function changeWizardImage(thumbnail) {
  const mainImage = document.getElementById("main-wizard-image");
  const title = document.getElementById("wizard-image-title");
  const text = document.getElementById("wizard-image-text");

  if (mainImage) {
    mainImage.src = thumbnail.src;
    mainImage.alt = thumbnail.alt;
  }

  if (title) {
    title.textContent = thumbnail.dataset.title;
  }

  if (text) {
    text.textContent = thumbnail.dataset.description;
  }

  document.querySelectorAll(".thumbnail-row img").forEach((img) => {
    img.classList.remove("active-thumbnail");
  });

  thumbnail.classList.add("active-thumbnail");
}