// geolocation.js

function weatherUserData() {
    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
        // Request the user's current position
        navigator.geolocation.getCurrentPosition(
        async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
    
            // Optionally, display the location or weather data
            const city = document.getElementById('city');
            const temperature = document.getElementById('temperature');
            const description = document.getElementById('description');
    
            const apiKey = "c287beeb39cc4df882870e6de0a77573";
            const apiUrl = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&lang=pt`;
            console.log(apiUrl)
            try {
            const response = await fetch(apiUrl);
            const jsonData = await response.json();
    
            if (jsonData) {
                city.innerHTML = jsonData.data[0].city_name;
                temperature.innerHTML = jsonData.data[0].temp;
                description.innerHTML = jsonData.data[0].weather.description;

            }
            } catch (error) {
                city.innerHTML += `<p>Error fetching weather data: ${error}</p>`;
            }
        },
        (error) => {
            console.error("Error getting location:", error);
            const city = document.getElementById('city');
            city.innerHTML = "<p>Unable to retrieve your location.</p>";
        }
        );
    } else {
        console.log("Geolocation is not available in this browser.");
        const city = document.getElementById('city');
        city.innerHTML = "<p>Geolocation is not supported by your browser.</p>";
    }
}
  