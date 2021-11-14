import os
import json
import requests
import boto3
from botocore.exceptions import ClientError
from random import randint, uniform
from tensorflow import keras
from dotenv import load_dotenv 
load_dotenv()

model = keras.models.load_model("../weather.model")

def upload_data(bucket, coord):
  """
  Upload prediction from model to S3
  """
  client = boto3.client('s3')  
  lon, lat = coord
  key = f"{lon},{lat}.json"
  out = make_prediction(coord)
  client.put_object(Body=out, Bucket=bucket, Key=key)
  return json.dumps({"success": True}), 200, {'ContentType':'application/json'}

def make_prediction(coord):
  lon, lat = coord
  url = "https://api.openweathermap.org/data/2.5/onecall"
  api_key = os.environ["OWM_API_KEY"]
  params = {"lat": f"{lat}", "lon": f"{lon}", "exclude": "current,minutely,daily,alerts", "appid": f"{api_key}"}
  r = requests.get(url, params=params)

  x = r.json() 
  # load relevant data into numpy array
  # ...
  out = model.predict(x)

  out = fake_model(coord)
  return out

def fake_model(coord):
  """
  Randomly generated predictions for now
  """
  data = {}
  data["lon"], data["lat"] = coord
  sums = ["cloudy", "mostly cloudy", "partly cloudy", "clear", "rain", "humid"]
  hours = []
  for i in range(12):
    x = {
      "time": i,
      "summary": sums[randint(0, len(sums)-1)],
      "precipIntensity": round(uniform(0, 1), 2),
      "precipProbability": round(uniform(0, 1), 2),
      "temperature": round(uniform(0, 100), 2),
      "humidity": round(uniform(0, 1), 2)
    }
    hours.append(x)
  data["hourly"] = {}
  data["hourly"]["data"] = hours
  return json.dumps(data)

