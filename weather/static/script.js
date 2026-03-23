// DOM Elements
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const searchError = document.getElementById('searchError');
const loadingSpinner = document.getElementById('loadingSpinner');
const weatherContainer = document.getElementById('weatherContainer');
const welcomeMessage = document.getElementById('welcomeMessage');
let currentTempC = null; // global
let currentFeelsLikeC = null;

const toggle = document.querySelector('#button-3 .checkbox');

toggle.addEventListener('change', () => {
    const tempEl = document.getElementById('temperature');
    const feelsEl = document.getElementById('feelsLike');
    const unitEl = document.querySelector('.temp-unit');

    if (!currentTempC) return;

    if (toggle.checked) {
        // Convert to Fahrenheit
        const tempF = cToF(currentTempC);
        const feelsF = cToF(currentFeelsLikeC);

        tempEl.textContent = tempF;
        feelsEl.textContent = `Feels like ${feelsF}°F`;
        unitEl.textContent = '°F';
    } else {
        // Back to Celsius
        tempEl.textContent = currentTempC;
        feelsEl.textContent = `Feels like ${currentFeelsLikeC}°C`;
        unitEl.textContent = '°C';
    }
});

// Form submission handler
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    await fetchWeather(city);
});

/**
 * Fetch weather data from the backend API
 */
async function fetchWeather(city) {
    try {
        // Show loading state
        showLoading(true);
        clearError();
        weatherContainer.style.display = 'none';
        welcomeMessage.style.display = 'none';
        
        // Make API request
        const response = await fetch('/api/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city })
        });
        
        const data = await response.json();
        
        if (!data.success) {
            showError(data.error || 'Unable to fetch weather data');
            showLoading(false);
            return;
        }
        
        // Display weather data
        displayWeather(data);
        showLoading(false);
        weatherContainer.style.display = 'block';
        
    } catch (error) {
        console.error('Error:', error);
        showError('An error occurred while fetching weather data. Please try again.');
        showLoading(false);
        weatherContainer.style.display = 'none';
    }
}

function cToF(c) {
    return ((c * 9/5) + 32).toFixed(1);
}

function fToC(f) {
    return ((f - 32) * 5/9).toFixed(1);
}

/**
 * Display weather information on the page
 */
function displayWeather(data) {
    // City and country
    document.getElementById('cityName').textContent = data.city;
    document.getElementById('countryName').textContent = data.country;
    
    // Temperature and description
    currentTempC = data.temperature;
    currentFeelsLikeC = data.feels_like;

    document.getElementById('temperature').textContent = currentTempC;
    document.getElementById('description').textContent = data.description;
    document.getElementById('feelsLike').textContent = `Feels like ${currentFeelsLikeC}°C`;
    
    // Weather icon from OpenWeatherMap CDN
    const iconCode = data.icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    document.getElementById('weatherIcon').src = iconUrl;
    document.getElementById('weatherIcon').alt = data.description;
    
    // Extended weather data
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind_speed} m/s`;
    document.getElementById('pressure').textContent = `${data.pressure} hPa`;
    document.getElementById('visibility').textContent = `${data.visibility} km`;
    
    // UV Index
    if (data.uv_index === 'N/A') {
        document.getElementById('uvIndex').textContent = 'N/A';
    } else {
        document.getElementById('uvIndex').textContent = data.uv_index;
    }
    
    // Last updated time
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    document.getElementById('lastUpdated').textContent = timeString;
    
    // Clear input
    cityInput.value = '';
}

/**
 * Show/hide loading spinner
 */
function showLoading(isLoading) {
    if (isLoading) {
        loadingSpinner.style.display = 'block';
    } else {
        loadingSpinner.style.display = 'none';
    }
}

/**
 * Display error message
 */
function showError(message) {
    searchError.textContent = message;
    searchError.style.display = 'block';
    welcomeMessage.style.display = 'none';
}

/**
 * Clear error message
 */
function clearError() {
    searchError.textContent = '';
    searchError.style.display = 'none';
}

// Show welcome message on load
document.addEventListener('DOMContentLoaded', () => {
    welcomeMessage.style.display = 'block';
});
