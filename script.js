document.addEventListener('DOMContentLoaded', function() {
    // Set Current Date
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // IP-based City Personalization
    const cityElements = document.querySelectorAll('.dynamic-city');
    
    // Using a free IP geolocation API
    // Note: In a production environment, you might want to use a more robust or paid service
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            if (data.city) {
                const city = data.city;
                cityElements.forEach(el => {
                    el.textContent = city;
                });
            }
        })
        .catch(error => {
            console.error('Error fetching city data:', error);
            // Default fallback is already in HTML ("your area")
        });
});
