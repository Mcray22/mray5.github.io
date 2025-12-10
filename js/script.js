document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (!hamburger || !navLinks) {
    console.error('Hamburger or nav not found – check HTML!');
    return;
  }
  
  console.log('Hamburger JS loaded successfully');
  
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
    // Optional: Change icon to X when open
    hamburger.textContent = navLinks.classList.contains('nav-open') ? '✕' : '☰';
  });
});