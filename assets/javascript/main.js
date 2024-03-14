// Bescherming tegen afbeeldingsdiefstal | XerosRadioNonstop
document.addEventListener('DOMContentLoaded', function () {
    // Selecteer alle afbeeldingen op de pagina
    const afbeeldingen = document.querySelectorAll('img');
  
    // Voorkom het standaard contextmenu en toon een aangepopt bericht | XerosRadioNonstop
    function toonAangepoptBericht(event) {
      event.preventDefault();
      alert('U mag geen afbeeldingen van onze website stelen zonder toestemming!');
    }
  
    // Voeg een eventlistener toe aan elke afbeelding om met rechts klikken om te gaan | XerosRadioNonstop
    afbeeldingen.forEach((img) => {
      img.addEventListener('contextmenu', toonAangepoptBericht);
      
      // Voorkom slepen en kopiëren van afbeeldingen | XerosRadioNonstop
      img.setAttribute('draggable', 'false');
      img.addEventListener('dragstart', function (e) {
        e.preventDefault();
      });
    });
  });
