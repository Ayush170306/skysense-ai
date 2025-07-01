from flask import Flask, render_template, request
import requests, joblib
import numpy as np

app = Flask(__name__)
API_KEY = "4b2e3be0ea06f2b3cb7972f2076fa997"
model = joblib.load('forecast_model.pkl')

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/forecast', methods=['GET', 'POST'])
def forecast():
    weather_data = None
    forecast_data = None

    if request.method == 'POST':
        city = request.form['city']
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
        res = requests.get(url)

        if res.status_code == 200:
            data = res.json()
            weather_data = {
                'city': city,
                'temperature': data['main']['temp'],
                'humidity': data['main']['humidity'],
                'pressure': data['main']['pressure']
            }

            # Create dummy input for ML model
            X_input = np.array([[data['main']['temp'] - 1, data['main']['humidity'], data['main']['pressure']]])
            predictions = model.predict(X_input.reshape(1, -1))[0]

            forecast_data = {
                'dates': ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
                'temps': [predictions + i for i in range(5)]
            }
        else:
            weather_data = {'error': 'City not found'}

    return render_template('forecast.html', weather=weather_data, forecast_data=forecast_data)

@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")

@app.route('/plans')
def plans():
    return render_template("plans.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/contact')
def contact():
    return render_template("contact.html")

if __name__ == "__main__":
    app.run(debug=True)
