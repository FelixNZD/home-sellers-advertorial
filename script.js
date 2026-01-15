document.addEventListener('DOMContentLoaded', function () {
    // Set Current Date
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // IP-based City Personalization & Time Calculation
    const cityElements = document.querySelectorAll('.dynamic-city');
    const deadlineTimeEl = document.getElementById('deadline-time');

    function setDeadline(city, timezone) {
        cityElements.forEach(el => {
            el.textContent = city;
        });

        if (deadlineTimeEl) {
            // Calculate 4 hours from now
            const now = new Date();
            const deadline = new Date(now.getTime() + 4 * 60 * 60 * 1000);

            const options = {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: timezone || undefined
            };

            try {
                deadlineTimeEl.textContent = deadline.toLocaleTimeString('en-US', options);
            } catch (e) {
                // Fallback for invalid timezone
                deadlineTimeEl.textContent = deadline.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            }
        }
    }

    // Check for "city" URL macro first
    const urlParams = new URLSearchParams(window.location.search);
    const urlCity = urlParams.get('city');

    if (urlCity) {
        setDeadline(urlCity);
    } else {
        // Fallback to IP geolocation API
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                if (data.city) {
                    setDeadline(data.city, data.timezone);
                } else {
                    setDeadline("Your Area");
                }
            })
            .catch(error => {
                console.error('Error fetching city data:', error);
                setDeadline("Your Area");
            });
    }
});
