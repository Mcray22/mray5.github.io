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