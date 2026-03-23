from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__, template_folder='weather/templates', static_folder='weather/static', static_url_path='/static')

# Load local weather data
def load_weather_data():
    """Load weather data from local JSON file"""
    try:
        with open('weather_data.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

@app.route('/')
def index():
    """Serve the main weather application page"""
    return render_template('index.html')

@app.route('/api/weather', methods=['POST'])
def get_weather():
    """
    Uses local weather data from weather_data.json
    """
    try:
        data = request.get_json()
        city = data.get('city', '').strip()
        
        if not city:
            return jsonify({'success': False, 'error': 'Please enter a city name'}), 400
        
        # Load local weather data
        weather_data_dict = load_weather_data()
        
        # Case-insensitive city lookup
        city_found = None
        for stored_city in weather_data_dict.keys():
            if stored_city.lower() == city.lower():
                city_found = stored_city
                break
        
        if not city_found:
            available_cities = ', '.join(weather_data_dict.keys())
            return jsonify({
                'success': False, 
                'error': f'City "{city}" not found. Available cities: {available_cities}'
            }), 404
        
        weather_data = weather_data_dict[city_found]
        
        # Return the weather data
        result = {
            'success': True,
            'city': weather_data.get('city'),
            'country': weather_data.get('country'),
            'temperature': weather_data.get('temperature'),
            'feels_like': weather_data.get('feels_like'),
            'description': weather_data.get('description'),
            'humidity': weather_data.get('humidity'),
            'wind_speed': weather_data.get('wind_speed'),
            'pressure': weather_data.get('pressure'),
            'visibility': weather_data.get('visibility'),
            'icon': weather_data.get('icon'),
            'uv_index': weather_data.get('uv_index')
        }
        
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
