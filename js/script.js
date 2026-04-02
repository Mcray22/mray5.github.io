// Wait until the entire HTML page loads before running JS
document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVIGATION (you already had this) =====
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Safety check: if nav isn't found, stop execution
  if (!hamburger || !navLinks) {
    console.error('Hamburger or nav not found – check HTML!');
    return;
  }

  // Toggle mobile menu open/close
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');

    // Change icon depending on state
    hamburger.textContent = navLinks.classList.contains('nav-open') ? '✕' : '☰';
  });

  // ===== CALCULATOR STARTS HERE =====

  // Grab the calculator form from the page
  const calculatorForm = document.getElementById('calculator-form');

  // Only run this code if the calculator exists (important for multi-page site)
  if (calculatorForm) {

    // Listen for when the user submits the form
    calculatorForm.addEventListener('submit', function (event) {

      // Prevent the page from refreshing (default form behavior)
      event.preventDefault();

      // ===== GET USER INPUT VALUES =====

      // Room price per night (from dropdown)
      const roomPrice = parseFloat(document.getElementById('room').value);

      // Convert input dates into real Date objects
      const checkin = new Date(document.getElementById('checkin').value);
      const checkout = new Date(document.getElementById('checkout').value);

      // Number of extra guests (default to 0 if empty)
      const guests = parseInt(document.getElementById('guests').value) || 0;

      // Get discount code and force uppercase for consistency
      const discountCode = document.getElementById('discount').value.trim().toUpperCase();

      // Check if upgrade box is checked (true or false)
      const weekendUpgrade = document.getElementById('weekendUpgrade').checked;

      // ===== CALCULATE LENGTH OF STAY =====

      // Convert milliseconds to days
      const millisecondsPerDay = 1000 * 60 * 60 * 24;

      // Calculate number of nights
      const nights = Math.ceil((checkout - checkin) / millisecondsPerDay);

      // Validate dates
      if (isNaN(checkin.getTime()) || isNaN(checkout.getTime()) || nights <= 0) {
        alert('Please choose a valid arrival and departure date.');
        return;
      }

      // ===== BASE COST CALCULATIONS =====

      // Room cost = price × nights
      let roomSubtotal = roomPrice * nights;

      // Guest cost = $20 per guest per night
      let guestFee = guests * 20 * nights;

      // ===== SEASONAL PRICING =====

      let seasonFee = 0;

      // Get month (1–12)
      const checkinMonth = checkin.getMonth() + 1;

      // Peak months: June, July, December
      if (checkinMonth === 6 || checkinMonth === 7 || checkinMonth === 12) {
        seasonFee = 35 * nights;
      }

      // ===== OPTIONAL ADD-ONS =====

      // Flat fee if checked
      let packageFee = weekendUpgrade ? 50 : 0;

      // ===== SUBTOTAL BEFORE DISCOUNT =====

      let subtotal = roomSubtotal + guestFee + seasonFee + packageFee;

      // ===== DISCOUNTS =====

      let discountAmount = 0;

      // Apply discount based on code
      if (discountCode === 'DRAGON10') {
        discountAmount = subtotal * 0.10; // 10% off
      } else if (discountCode === 'GUILD20') {
        discountAmount = subtotal * 0.20; // 20% off
      }

      // ===== TAX CALCULATION =====

      // Subtotal after discount
      let taxedAmount = subtotal - discountAmount;

      // 8.25% tax
      let taxAmount = taxedAmount * 0.0825;

      // Final total
      let grandTotal = taxedAmount + taxAmount;

      // ===== DISPLAY RESULTS =====

      document.getElementById('stayNights').textContent =
        `Length of stay: ${nights} night(s)`;

      document.getElementById('roomSubtotal').textContent =
        `Room cost: ${roomSubtotal.toFixed(2)} USD`;

      document.getElementById('guestFee').textContent =
        `Extra guest fee: ${guestFee.toFixed(2)} USD`;

      document.getElementById('seasonFee').textContent =
        `Seasonal fee: ${seasonFee.toFixed(2)} USD`;

      document.getElementById('packageFee').textContent =
        `Feast package: ${packageFee.toFixed(2)} USD`;

      document.getElementById('discountAmount').textContent =
        `Discount: -${discountAmount.toFixed(2)} USD`;

      document.getElementById('taxAmount').textContent =
        `Tax: ${taxAmount.toFixed(2)} USD`;

      document.getElementById('grandTotal').textContent =
        `Grand Total: ${grandTotal.toFixed(2)} USD`;

      // Show the result section (was hidden before)
      document.getElementById('result').classList.remove('hidden');
    });
  }
});