/* =====================================================
   FILE: js/event-map.js
   PURPOSE: Controls the interactive event map on the
            Events page using the Google Maps API.

            This file demonstrates JavaScript working
            with an external API to dynamically create
            and customize a live map.
===================================================== */


/* =====================================================
   INITIALIZE MAP
   Creates the map object and sets the starting
   location and zoom level.
===================================================== */

function initMap() {

  // Main event location coordinates
  const tavernLocation = {
    lat: 35.2220,
    lng: -101.8313
  };


  /* ===================================================
     CREATE MAP
     JavaScript connects to the Google Maps API and
     renders the map inside the HTML container.
  =================================================== */

  const map = new google.maps.Map(
    document.getElementById("event-map"),
    {
      zoom: 13,
      center: tavernLocation,

      // Optional map controls
      mapTypeControl: false,
      streetViewControl: false
    }
  );


  /* ===================================================
     CREATE LOCATION MARKER
     Places a marker at the event location.
  =================================================== */

  const marker = new google.maps.Marker({
    position: tavernLocation,
    map: map,
    title: "Sword & Board Tavern"
  });


  /* ===================================================
     INFORMATION WINDOW
     Displays additional information when the marker
     is clicked by the user.
  =================================================== */

  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div class="map-popup">
        <h3>Sword & Board Tavern</h3>
        <p>Gather here for events, quests, and adventures.</p>
      </div>
    `
  });


  /* ===================================================
     MARKER INTERACTION
     Opens the information window when the marker
     is clicked.
  =================================================== */

  marker.addListener("click", () => {

    infoWindow.open({
      anchor: marker,
      map,
    });

  });

}