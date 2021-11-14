import os
import json
import requests
import boto3
from botocore.exceptions import ClientError
from random import randint, uniform
from tensorflow import keras
from gen_pred import get_historical, process
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
  """
  lon, lat = coord
  url = "https://api.openweathermap.org/data/2.5/onecall"
  api_key = os.environ["OWM_API_KEY"]
  params = {"lat": f"{lat}", "lon": f"{lon}", "exclude": "current,minutely,daily,alerts", "appid": f"{api_key}"}
  r = requests.get(url, params=params)
  x = r.json() 
  """
  time = str(int(time.time())-86400)
  data = get_historical(coord, time)
  x, temp_avg, temp_std = process(data)
  out = model.predict(x).squeeze()
  out = (out*temp_std) + temp_avg
  ret = generate_json(out)
  return ret

def generate_json(preds):
  """
  Randomly generated predictions but the temperature is real
  """
  data = {}
  data["lon"], data["lat"] = coord
  sums = ["cloudy", "mostly cloudy", "partly cloudy", "clear", "rain", "humid"]
  hours = []
  ts = [*range(12)]
  for t, pred in zip(ts, preds):
    x = {
      "time": t,
      "summary": sums[randint(0, len(sums)-1)],
      "precipIntensity": round(uniform(0, 1), 2),
      "precipProbability": round(uniform(0, 1), 2),
      "temperature": preds,
      "humidity": round(uniform(0, 1), 2)
    }
    hours.append(x)
  data["hourly"] = {}
  data["hourly"]["data"] = hours
  return json.dumps(data)

