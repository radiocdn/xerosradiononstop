// Function to check if a string is a valid URL | XerosRadioNonstop Api Checking
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
  }
  
  function updateDJInfo() {
    // Fetch URL for XerosRadioNonstop Api
    const url = 'https://azuracast.streamxerosradio.duckdns.org/api/nowplaying/xerosradiononstop';
  
    const djInfoElement = document.getElementById('djInfo');
    const artworkElement = document.getElementById('artwork');
  
    const fetchOptions = {
        method: 'GET',
        mode: 'cors', // Cors for XerosRadioNonstop Api
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
    };
  
    fetch(url, fetchOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Het verzoek aan de XerosRadioNonstop Servers is mislukt. Probeer het later opnieuw.');
            }
            return response.json();
        })
        .then(data => {
            if (data.live && data.live.is_live) {
                djInfoElement.textContent = data.live.streamer_name;
                const artworkUrl = isValidUrl(data.live.art)
                    ? data.live.art
                    : 'https://res.cloudinary.com/xerosradio/image/upload/w_200,h_200,f_auto,q_auto/XerosRadio_Logo_Achtergrond_Wit';
  
                const newImage = new Image();
                newImage.src = "https://wsrv.nl/?w=200&h=200&output=webp&url=" + artworkUrl;
                newImage.draggable = false; // Prevent image dragging | XerosRadioNonstop Api
                newImage.loading = "lazy";
                newImage.alt = "DJ";
                newImage.style.opacity = 1;
                newImage.style.width = '200px';
                newImage.style.height = '200px';
  
                // Disable right-click context menu
                newImage.addEventListener('contextmenu', function (e) {
                    e.preventDefault();
                });
  
                artworkElement.innerHTML = '';
                artworkElement.appendChild(newImage);
            } else {
                djInfoElement.textContent = 'Nonstop Muziek';
                artworkElement.innerHTML = `<img src="https://res.cloudinary.com/xerosradio/image/upload/w_200,h_200,f_auto,q_auto/v1/Assets/Nonstop_Muziek" alt="XerosRadio" draggable="false" loading="lazy" style="width: 200px; height: 200px;">`;
            }
        })
        .catch(error => {
            console.error('Fout:', error);
            const djInfoElement = document.getElementById('djInfo');
            djInfoElement.textContent = 'XerosRadioNonstop is momenteel niet beschikbaar. Probeer het later opnieuw.';
  
            // Load the default image on error of XerosRadioNonstop Api
            const artworkElement = document.getElementById('artwork');
            artworkElement.innerHTML = `<img src="https://res.cloudinary.com/xerosradio/image/upload/w_200,h_200,f_auto,q_auto/XerosRadio_Logo_Achtergrond_Wit" alt="XerosRadio" draggable="false" loading="lazy" style="width: 200px; height: 200px;">`;
        });
  }
  
  // Get New DJ-info immediately From XerosRadioNonstop Api and check and if avabile load every 5 seconds
  setInterval(updateDJInfo, 5000);
  updateDJInfo(); // Call the function immediately
  
