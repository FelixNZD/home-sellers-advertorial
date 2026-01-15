document.addEventListener('DOMContentLoaded', function () {
    // Set Current Date
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // IP-based City Personalization
    const cityElements = document.querySelectorAll('.dynamic-city');

    // Check for "city" URL macro first
    const urlParams = new URLSearchParams(window.location.search);
    const urlCity = urlParams.get('city');

    if (urlCity) {
        cityElements.forEach(el => {
            el.textContent = urlCity;
        });
    } else {
        // Fallback to IP geolocation API
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
                // Default fallback "Your Area" is already in HTML
            });
    }
});
