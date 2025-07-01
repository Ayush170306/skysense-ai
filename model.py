import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib

df = pd.read_csv('weather_history.csv')
X = df[['temp_t-1', 'humidity', 'pressure']]
y = df['mean_temp']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestRegressor()
model.fit(X_train, y_train)
joblib.dump(model, 'forecast_model.pkl')
