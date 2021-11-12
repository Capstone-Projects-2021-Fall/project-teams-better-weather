import os
import json
import requests
import boto3
from botocore.exceptions import ClientError
from tensorflow import keras

model = keras.models.load_model("test/testnet")

def upload_data(bucket, coord):
  """
  Upload prediction from model to S3
  """
  client = boto3.client('s3')  
  lon, lat = coord
  key = f"{lon},{lat}.json"
  out = makmakee_prediction(coord)
  client.put_object(Body=out, Bucket=bucket, Key=key)
  return (success=True)

def make_prediction(coord):
  lon, lat = coord
  url = "https://api.openweathermap.org/data/2.5/onecall"
  api_key = os.environ["OWM_API_KEY"]
  params = {"lat": f"{lat}", "lon": f"{lon}", "exclude": "current,minutely,daily,alerts", "appid": f"{api_key}"}
  r = requests.get(url, params=params)

  x = r.json() 
  # load relevant data into numpy array
  # ...
  out = model(x)
  return out

def fake_model(coord):
  """
  Randomly generated predictions for now
  """
  data = {}
  data["lon"], data["lat"] = coord
  sums = ["cloudy", "mostly cloudy", "partly cloudy", "clear", "rain", "humid"]
  data["hourly"] = {}
  hours = []
  for i in range(12):
    x["time"] = i
    x["summary"] = sums[random.randint(0, len(sums)-1)]
    x["precipIntensity"] = round(random.uniform(0, 1), 2)
    x["precipProbability"] = round(random.uniform(0, 1), 2)
    x["temperature"] = round(random.uniform(0, 100), 2)
    x["humidity"] = round(random.uniform(0, 1), 2)
    hours.append(x)
  data["hourly"]["data"] = hours
  return json.dumps(data)

