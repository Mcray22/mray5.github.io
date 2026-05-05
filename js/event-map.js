"use strict";

/* ========================================
   FILE: js/events-map.js
   PURPOSE: Uses Google Maps JavaScript API
            to display real event location.
   ======================================== */

function initEventMap() {
  const location = { lat: 32.7767, lng: -96.7970 }; // Dallas example

  const map = new google.maps.Map(document.getElementById("event-map"), {
    zoom: 13,
    center: location,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#1b1b1b" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#00ffe0" }] }
    ]
  });

  new google.maps.Marker({
    position: location,
    map: map,
    title: "Sword & Board Gathering Hall"
  });
}