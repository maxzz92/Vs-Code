# Weather App 🌤️

A simple Flask-based weather application that displays current weather information with icons for various cities. No API key required - uses local weather data!

## Features

✅ Search weather by city name  
✅ Display current temperature, weather description, and icons  
✅ Show extended weather details:
- Humidity
- Wind speed
- Atmospheric pressure
- Visibility
- UV index
- Feels-like temperature

✅ Modern gradient UI with responsive design  
✅ No external API dependencies - works offline with local data  
✅ Fast and lightweight

## Available Cities

The app includes pre-loaded weather data for these cities:
- New York (US)
- London (GB)
- Tokyo (JP)
- Paris (FR)
- Sydney (AU)
- Dubai (AE)
- Toronto (CA)
- Berlin (DE)
- Mumbai (IN)
- Singapore (SG)

You can easily add more cities by editing `weather_data.json`

## Installation

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

This will install Flask, which is the only required dependency.

### Step 2: Run the App

```bash
python weather_app.py
```

You should see output like:
```
 * Running on http://127.0.0.1:5000
 * Running on http://10.210.0.127:5000
```

### Step 3: Open in Browser

Now open your browser and go to:
```
http://localhost:5000
```

## How to Use

1. **Enter a city name** in the search box
2. **Click "Search"** or press Enter
3. **View the weather** instantly displayed with an icon
4. **Check extended details** in the grid below the main weather card

## Project Structure

```
.
├── weather_app.py              # Main Flask application
├── weather_data.json           # Local weather data for cities
├── requirements.txt            # Python dependencies
├── README.md                   # This file
├── .env.example                # Environment configuration template
├── weather/
│   ├── templates/
│   │   └── index.html         # Main HTML template
│   └── static/
│       ├── style.css          # CSS styling
│       └── script.js          # Frontend JavaScript
└── calculator.py              # Separate calculator app (optional)
```

## Adding More Cities

To add weather data for more cities, edit `weather_data.json`:

```json
{
  "Your City": {
    "city": "Your City",
    "country": "CountryCode",
    "temperature": 20.5,
    "feels_like": 19.2,
    "description": "Cloudy",
    "humidity": 65,
    "wind_speed": 4.5,
    "pressure": 1013,
    "visibility": 10,
    "icon": "02d",
    "uv_index": 5.2
  }
}
```

- `icon`: Use OpenWeatherMap icon codes (e.g., "01d" for sunny day)
- `temperature` & `feels_like`: In Celsius
- `humidity`: 0-100 (%)
- `wind_speed`: In m/s
- `pressure`: In hPa
- `visibility`: In km
- `uv_index`: UV radiation index

## Weather Icon Codes

Common OpenWeatherMap icon codes:
- `01d` / `01n` - Clear sky (day/night)
- `02d` / `02n` - Few clouds (day/night)
- `03d` / `03n` - Scattered clouds (day/night)
- `04d` / `04n` - Broken clouds (day/night)
- `09d` - Shower rain
- `10d` / `10n` - Rain (day/night)
- `11d` - Thunderstorm
- `13d` - Snow
- `50d` - Mist

## Troubleshooting

### Port 5000 Already in Use

If you get an error that port 5000 is already in use, you can change it in `weather_app.py`:

```python
# Change the last line from:
app.run(debug=True, host='0.0.0.0', port=5000)

# To:
app.run(debug=True, host='0.0.0.0', port=5001)  # Use port 5001 instead
```

### Flask Not Found

Make sure you've installed the dependencies:

```bash
pip install Flask
```

### City Not Found Error

Double-check the city name spelling. The app performs case-insensitive matching, so "london", "LONDON", and "London" all work. If the error persists, add the city to `weather_data.json`.

## Development

The app runs in Flask's debug mode, which means:
- Changes to Python files automatically reload the server
- A debugger is active at PIN: 289-553-767
- Detailed error messages are displayed

To disable debug mode for production, change the last line in `weather_app.py`:

```python
app.run(debug=False, host='0.0.0.0', port=5000)
```

## License

This project is open source and available for educational use.

## Future Enhancements

- Add more cities
- Implement weather forecast (5-day, hourly)
- Add search suggestions/autocomplete
- Save favorite cities
- Multi-language support
- Real API integration

---

**Enjoy the weather app!** 🌦️
