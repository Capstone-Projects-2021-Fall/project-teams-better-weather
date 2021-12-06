#!/usr/bin/env python3
import json
import time
import requests
import numpy as np 
from sklearn.preprocessing import MinMaxScaler
from tensorflow import keras

def get_historical(coord, time):
  """
  Get historical weather data from OpenWeather API 

  Parameters 
  ---------
  coord : tuple 
    A tuple of longitude and latitude (lon, lat)
  time : int
    A unix time stamp of the current time

  Returns 
  ---------
  data : json
    A json of 48 hours of past weather data at given coords starting from given time
  """
  lon, lat = coord
  api_key = '2fc271ed0e74cba6a60d713a61a9770b'
  url = "http://api.openweathermap.org/data/2.5/onecall/timemachine"
  params = {"lat": f"{lat}", "lon": f"{lon}", "dt": f"{time}", "units": "imperial", "appid": f"{api_key}"}
  r = requests.get(url, params=params)
  data = r.json() 
  return data

def process(data):
  """
  Process historical weather data from OpenWeather API 

  Parameters
  ---------
  data : json
    A json of 48 hours of past weather data

  Returns
  ---------
  x : ndarray
    An array of 24 hours of historical weather data formatted to be fed into model
  temp_avg : float32 
    The mean temperature of historical data
  temp_std : float32
    The standard deviation of temperature of historical data
  """
  hourly = data["hourly"]
  exclude = ["dt", "feels_like", "pressure", "dew_point", "uvi", "clouds", "visibility", "wind_deg", "weather", "wind_gust", "rain", "snow"]
  for h in hourly:
    for ex in exclude:
      h.pop(ex, None)
  #print(json.dumps(hourly, indent=4))
  x = np.array([list(h.values()) for h in hourly])
  temp_avg = np.mean(x[:,0]) 
  temp_std = np.std(x[:,0])
  scaler = MinMaxScaler()
  x = scaler.fit_transform(x)
  x = np.expand_dims(x[:,0], axis=(0, 2)) # just temp
  return x, temp_avg, temp_std

"""
time = str(int(time.time())-86400)
coord = ['-80.3127', '43.3601']
#coord = ["-75", "40"]
data = get_historical(coord, time)
x, temp_avg, temp_std = process(data)

model = keras.models.load_model("../weather.model")
out = model.predict(x).squeeze()
out = (out*temp_std) + temp_avg
print(out)
"""
