// ===============================
// FILE: js/common.js
// PURPOSE: Shared JavaScript for Sword & Board
// Handles global navigation behavior used across all pages.
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (!hamburger || !navLinks) {
    return;
  }

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");

    hamburger.textContent = navLinks.classList.contains("nav-open")
      ? "✕"
      : "☰";
  });
});