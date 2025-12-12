document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu toggle (site-wide)
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    console.log('Hamburger JS loaded successfully');
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('nav-open');
      // Optional: Change icon to X when open
      hamburger.textContent = navLinks.classList.contains('nav-open') ? '✕' : '☰';
    });
  } else {
    console.error('Hamburger or nav not found – check HTML!');
  }

  // Form action (contacts.html only – checks if form exists)
  const form = document.getElementById('contact-form');
  if (form) {
    console.log('Contact form JS loaded successfully');
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Stops page reload
      
      // Grab field values (matches your HTML: no ids, so uses types/selectors)
      const nameField = form.querySelector('input[type="text"]');  // Adventurer Name
      const emailField = form.querySelector('input[type="email"]'); // Email
      const messageField = form.querySelector('textarea'); // Message
      const arrivalField = form.querySelector('input[type="date"]:first-of-type'); // Arrival
      const departureField = form.querySelector('input[type="date"]:last-of-type'); // Departure
      
      const name = nameField ? nameField.value.trim() : '';
      const email = emailField ? emailField.value.trim() : '';
      const message = messageField ? messageField.value.trim() : '';
      const arrival = arrivalField ? arrivalField.value : '';
      const departure = departureField ? departureField.value : '';
      
      // Simple validation
      if (!name || !email || !message || !arrival || !departure) {
        alert('The raven awaits your full missive: Name, reply path, dates, and words, brave one!');
        return;
      }
      
      if (!email.includes('@')) {
        alert('The scrying orb address needs its true mark—the @ sigil.');
        return;
      }
      
      // Date validation (safe: skips if invalid dates)
      try {
        if (new Date(arrival) > new Date(departure)) {
          alert('The raven senses a twist in time—ensure arrival precedes departure!');
          return;
        }
      } catch (e) {
        alert('Dates must be valid for the raven to navigate the stars!');
        return;
      }
      
      // Success action
      console.log('Raven dispatched:', { name, email, arrival, departure, message });  // Log for demo
      alert(`Hail, ${name}! Your raven has taken wing from ${arrival} to ${departure}. We shall reply via ${email} forthwith. 🐦‍⬛`);
      
      // Reset form
      form.reset();
    });
  }
});