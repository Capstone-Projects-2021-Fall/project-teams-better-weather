#!/usr/bin/env python
import json
import pandas as pd
from pandas import json_normalize
import time
import requests 
from sklearn import preprocessing
import numpy as np
import tensorflow as tf

def getWeather(lat, long, dt):
   print("Gathering Weather Data")
   LAT = lat
   LONG = long
   dt = dt
   API_KEY = '2fc271ed0e74cba6a60d713a61a9770b'
   url = "http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=%s&lon=%s&dt=%s&units=imperial&appid=%s" % (LAT, LONG, dt, API_KEY)
   print(url)
   response = requests.get(url)
   data = json.loads(response.text)
   #print(data)

   return data

def format(data):
   print("Formating Weather Data")
   hourly = data["hourly"]
   for entry in hourly:
      entry.pop('feels_like')
      entry.pop('pressure')
      entry.pop('dew_point')
      entry.pop('uvi')
      entry.pop('clouds')
      entry.pop('visibility')
      entry.pop('wind_deg')
      entry.pop('weather')


   df = json_normalize(hourly)
   df.to_csv('data.csv')
   return df
   print("file saved")
   #print(df)
    
def generateReport(coords):
   lon, lat = coords
   today = int(time.time())
   print("time" + str(today))
   yesterday = today - 86400
   print("first call")
   result = getWeather(lon, lat, str(yesterday))
   #print('second call')
   #result =  {**getWeather(lon, lat, str(today)), **getWeather(lon, lat, str(yesterday))}
   #print(result)
   format(result)
    

LAT = "-75"
LON = "40"
coords = [LON, LAT]
generateReport(coords)


temp = pd.read_csv("data.csv")

temp.drop('Unnamed: 0', inplace=True, axis=1)
temp.drop('wind_gust', inplace=True, axis=1)
temp.drop('rain.1h', inplace=True, axis=1)
temp['dt'] = pd.to_datetime(temp['dt'],unit='s')
temp.index =  temp['dt']
temp.drop('dt', inplace=True, axis=1)
temp_avg = temp["temp"].mean()
temp_std = temp['temp'].std()

model = tf.keras.models.load_model("weather.model")

norm = temp
#norm.drop('DATE', inplace=True, axis=1)
x = norm.values #returns a numpy array
min_max_scaler = preprocessing.MinMaxScaler()
x_scaled = min_max_scaler.fit_transform(x)
temp = pd.DataFrame(x_scaled)
genPred = temp.to_numpy()
genPred = genPred[: 24, 0]
genPred = np.reshape(genPred, (1, genPred.shape[0], 1))
model.predict(genPred)
pred = [(genPred * temp_std) + temp_avg]
print(pred)

