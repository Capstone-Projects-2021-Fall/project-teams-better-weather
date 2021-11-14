# importing requests and json
import requests, json
import time 
import datetime
import pytz
import pandas as pd
from pandas import json_normalize 
# base URL


def getWeather():
   print("Gathering Weather Data")
   CITY = "Chicago"
   LAT = "41.8781"
   LONG = "-87.6298"
   dt = str(time.time())
   API_KEY = '2fc271ed0e74cba6a60d713a61a9770b'
   START = 	'1636012002'
   END = 	'1636447602'
   #url = "http://history.openweathermap.org/data/2.5/history/city?lat=41.85&lon=-87.65&appid=%s" %(API_KEY)
   #url = "http://history.openweathermap.org/data/2.5/history/city?lat=%s&lon=%s&type=hour&start=%s&end=%s&appid=%s" % (LAT, LONG, START, END, API_KEY)
   url = "http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=%s&lon=%s&dt=1636098402&units=imperial&appid=%s" % (LAT, LONG, API_KEY)
   print(url)
   response = requests.get(url)
   data = json.loads(response.text)
   print(data)

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
      #entry.pop('wind_gust')
      entry.pop('weather')

   df = json_normalize(hourly)
   #df.to_csv('C:\\Users\\gtray\\Documents\\College\\Fall 2021\\Capstone\\test.csv')
   #print("file saved")
   print(df)


data = getWeather()
format(data)
