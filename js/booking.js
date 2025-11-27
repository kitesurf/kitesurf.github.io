/*!
 * Booking System v1.0.0
 * Copyright (c) Kitesurf Mallorca SL
 * Backend Interface for Cloudflare Workers
 */

document.addEventListener("DOMContentLoaded", function() {
    
    /* --- KONFIGURATION --- */
    // Hier die echte Cloudflare Worker URL eintragen
    var API_URL = "https://backend.kite-mallorca-booking-api-v1.workers.dev";
    
    // DOM Elemente cachen
    var container = document.getElementById("booking-app");
    var errorBox = document.getElementById("booking-error");
  
    // Abbruch, wenn Container auf der Seite fehlt (z.B. andere Unterseite)
    if (!container) return;
  
    /**
     * Erstellt die HTML-Karten für jeden Slot
     * @param {Array} slots - Array von Slot-Objekten aus der API
     */
    function renderSlots(slots) {
        // Container leeren (Lade-Spinner entfernen)
        container.innerHTML = "";
      
        // Fall: Keine Termine erhalten
        if (slots.length === 0) {
            container.innerHTML = "<p>Keine Termine verfügbar.</p>";
            return;
        }
  
        // Durch alle Slots iterieren
        slots.forEach(function(slot) {
            // 1. Karte Wrapper
            var card = document.createElement("div");
            card.className = "booking-card";
            
            // 2. Uhrzeit
            var title = document.createElement("h3");
            title.textContent = slot.time + " Uhr";
            
            // 3. Kurs-Typ
            var type = document.createElement("p");
            type.textContent = slot.type;
            
            // 4. Verfügbarkeit (Grün bei >2, Orange bei wenig)
            var spots = document.createElement("div");
            spots.className = "spots-indicator"; // Klasse für CSS Styling nutzen!
            spots.style.color = slot.spots > 2 ? "green" : "orange"; // Fallback Inline
            spots.textContent = slot.spots + " Plätze frei";
            
            // 5. Auswahl-Button
            var btn = document.createElement("button");
            btn.textContent = "Auswählen";
            btn.className = "btn-book";
            
            // Click-Handler für diesen spezifischen Slot
            btn.onclick = function() {
                // Später: Hier Weiterleitung zum Stripe Checkout
                alert("Buchung für Slot " + slot.id + " gestartet!");
            };
  
            // Zusammenbauen
            card.appendChild(title);
            card.appendChild(type);
            card.appendChild(spots);
            card.appendChild(btn);
            container.appendChild(card);
        });
    }
  
    /* --- HAUPTLOGIK --- */
    
    // Daten vom Cloudflare Worker holen
    fetch(API_URL + "/api/slots")
        .then(function(response) {
            // Prüfen ob HTTP Status 200-299 ist
            if (!response.ok) {
                throw new Error("Netzwerk Antwort war nicht ok (Status: " + response.status + ")");
            }
            return response.json();
        })
        .then(function(data) {
            // Erfolgreich geladen -> Rendern
            renderSlots(data);
        })
        .catch(function(err) {
            // Fehlerbehandlung
            console.error("Booking API Error:", err);
            container.innerHTML = ""; // Spinner weg
            errorBox.style.display = "block";
            errorBox.textContent = "Fehler beim Laden der Termine. Bitte versuchen Sie es später erneut.";
        });
});