#!/usr/bin/env python3
import json
import time
import requests
import numpy as np 
from sklearn.preprocessing import MinMaxScaler
from tensorflow import keras

def get_historical(coord, time):
  lon, lat = coord
  api_key = '2fc271ed0e74cba6a60d713a61a9770b'
  url = "http://api.openweathermap.org/data/2.5/onecall/timemachine"
  params = {"lat": f"{lat}", "lon": f"{lon}", "dt": f"{time}", "units": "imperial", "appid": f"{api_key}"}
  r = requests.get(url, params=params)
  data = r.json() 
  return data

def process(data):
  hourly = data["hourly"]
  exclude = ["dt", "feels_like", "pressure", "dew_point", "uvi", "clouds", "visibility", "wind_deg", "weather", "wind_gust", "rain"]
  for h in hourly:
    for ex in exclude:
      h.pop(ex, None)
  #print(json.dumps(hourly, indent=4))
  x = np.array([list(h.values()) for h in hourly])
  temp_avg = np.mean(x[:,0]) 
  temp_std = np.std(x[:,0])
  scaler = MinMaxScaler()
  x = scaler.fit_transform(x)
  x = np.expand_dims(x[:24,0], axis=(0, 2)) # just temp
  return x, temp_avg, temp_std

time = str(int(time.time())-86400)
coord = ["-75", "40"]
data = get_historical(coord, time)
x, temp_avg, temp_std = process(data)

model = keras.models.load_model("../weather.model")
out = model.predict(x).squeeze()
out = (out*temp_std) + temp_avg
print(out)
