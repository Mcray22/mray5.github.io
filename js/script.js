// Wait until the HTML is fully loaded before running JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // SHARED NAVIGATION
  // PURPOSE: Toggle the mobile menu open/close
  // ========================================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("nav-open");

      // Change icon depending on menu state
      hamburger.textContent = navLinks.classList.contains("nav-open") ? "✕" : "☰";
    });
  }

  // ========================================
  // CALCULATOR PAGE
  // PURPOSE: Calculate room total based on dates,
  // guests, season, upgrades, discounts, and tax
  // ========================================
  const calculatorForm = document.getElementById("calculator-form");

  if (calculatorForm) {
    calculatorForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // ===== GET USER INPUT VALUES =====
      const roomPrice = parseFloat(document.getElementById("room").value);
      const checkin = new Date(document.getElementById("checkin").value);
      const checkout = new Date(document.getElementById("checkout").value);
      const guests = parseInt(document.getElementById("guests").value, 10) || 0;
      const discountCode = document.getElementById("discount").value.trim().toUpperCase();
      const weekendUpgrade = document.getElementById("weekendUpgrade").checked;

      // ===== CALCULATE LENGTH OF STAY =====
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const nights = Math.ceil((checkout - checkin) / millisecondsPerDay);

      if (isNaN(checkin.getTime()) || isNaN(checkout.getTime()) || nights <= 0) {
        alert("Please choose a valid arrival and departure date.");
        return;
      }

      // ===== BASE COST CALCULATIONS =====
      const roomSubtotal = roomPrice * nights;
      const guestFee = guests * 20 * nights;

      // ===== SEASONAL PRICING =====
      let seasonFee = 0;
      const checkinMonth = checkin.getMonth() + 1;

      if (checkinMonth === 6 || checkinMonth === 7 || checkinMonth === 12) {
        seasonFee = 35 * nights;
      }

      // ===== OPTIONAL ADD-ONS =====
      const packageFee = weekendUpgrade ? 50 : 0;

      // ===== SUBTOTAL BEFORE DISCOUNT =====
      const subtotal = roomSubtotal + guestFee + seasonFee + packageFee;

      // ===== DISCOUNTS =====
      let discountAmount = 0;

      if (discountCode === "DRAGON10") {
        discountAmount = subtotal * 0.10;
      } else if (discountCode === "GUILD20") {
        discountAmount = subtotal * 0.20;
      }

      // ===== TAX CALCULATION =====
      const taxedAmount = subtotal - discountAmount;
      const taxAmount = taxedAmount * 0.0825;
      const grandTotal = taxedAmount + taxAmount;

      // ===== DISPLAY RESULTS =====
      document.getElementById("stayNights").textContent =
        `Length of stay: ${nights} night(s)`;

      document.getElementById("roomSubtotal").textContent =
        `Room cost: ${roomSubtotal.toFixed(2)} USD`;

      document.getElementById("guestFee").textContent =
        `Extra guest fee: ${guestFee.toFixed(2)} USD`;

      document.getElementById("seasonFee").textContent =
        `Seasonal fee: ${seasonFee.toFixed(2)} USD`;

      document.getElementById("packageFee").textContent =
        `Feast package: ${packageFee.toFixed(2)} USD`;

      document.getElementById("discountAmount").textContent =
        `Discount: -${discountAmount.toFixed(2)} USD`;

      document.getElementById("taxAmount").textContent =
        `Tax: ${taxAmount.toFixed(2)} USD`;

      document.getElementById("grandTotal").textContent =
        `Grand Total: ${grandTotal.toFixed(2)} USD`;

      document.getElementById("result").classList.remove("hidden");
    });
  }

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

  // ========================================
  // WIZARD'S TOWER GALLERY SETUP
  // PURPOSE: Set active thumbnail on page load
  // ========================================
  const firstWizardThumbnail = document.querySelector(".thumbnail-row img");
  if (firstWizardThumbnail) {
    firstWizardThumbnail.classList.add("active-thumbnail");
  }
});


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