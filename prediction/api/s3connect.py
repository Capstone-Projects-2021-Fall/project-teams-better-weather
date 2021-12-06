import os
import json
import requests
import boto3
import time
from botocore.exceptions import ClientError
from random import randint, uniform
from tensorflow import keras
from gen_pred import get_historical, process
from dotenv import load_dotenv 
load_dotenv()

cd = os.path.dirname(__file__)
model = keras.models.load_model(os.path.join(cd, "model"))
print("**** MODEL LOADED ****")

def upload_data(bucket, coord):
  """
  Upload prediction from model to S3
  
  Parameters
  ---------
  bucket : string
    The name of the S3 bucket
  coord : tuple
    A tuple of longitude and latitude (lon, lat)

  Returns 
  ---------
  ret : json
    A JSON containing the status code 200 for success, or 503 for failure to make a prediction and/or save prediction in an S3
  """
  client = boto3.client('s3')  
  lon, lat = coord
  key = f"{lon},{lat}.json"
  out = make_prediction(coord)
  client.put_object(Body=out, Bucket=bucket, Key=key)
  return json.dumps({"success": True}), 200, {'ContentType':'application/json'}

def get_hourly_sums(coord):
  """
  Returns a list of summaries for 12 hours of coord

  Parameters 
  ---------
  coord : tuple 
    A tuple of longitude and latitude (lon, lat)

  Returns 
  ---------
  sums : list
    A list of summaries for 12 hours of coord
  """
  lon, lat = coord
  url = "https://api.openweathermap.org/data/2.5/onecall"
  api_key = os.environ["OWM_API_KEY"]
  params = {"lat": f"{lat}", "lon": f"{lon}", "exclude": "current,minutely,daily,alerts", "appid": f"{api_key}"}
  r = requests.get(url, params=params)
  x = r.json() 
  hourly = x["hourly"][:12]
  sums = []
  for h in hourly:
    s = h["weather"][0]["description"]
    sums.append(s)
  return sums

def make_prediction(coord):
  """
  Returns a JSON of 12 hour weather predictions from the prediction model

  Parameters
  ---------
  coord : tuple
     A tuple of longitude and latitude (lon, lat)

  Returns 
  ---------
  ret : json
    A JSON of 12 hour weather predictions from the prediction model. This includes time, temperature, summary, etc.
  """
  dt = str(int(time.time())-86400)
  data = get_historical(coord, dt)
  x, temp_avg, temp_std = process(data)
  out = model.predict(x).squeeze()
  out = (out*temp_std) + temp_avg
  summaries = get_hourly_sums(coord)
  ret = generate_json(coord, out, summaries)
  print(ret)
  return ret

def generate_json(coord, preds, sums):
  """
  Convert predictions and summaries into a JSON 
  Randomly generated predictions but the temperature and summary is real 

  Parameters
  ---------
  coord : tuple
    A tuple of longitude and latitude (lon, lat)
  preds : ndarray
    A array of 12 hour of temperature predictions
  sums : list 
    A list of summaries corresponding to the 12 hour predictions

  Returns 
  ---------
  data : json
    A JSON of 12 hour weather predictions from the prediction model.
  """
  data = {}
  data["lon"], data["lat"] = coord
  hours = []
  ts = [*range(12)]
  for t, pred, s in zip(ts, preds, sums):
    x = {
      "time": t,
      "summary": s,
      "precipIntensity": round(uniform(0, 1), 2),
      "precipProbability": round(uniform(0, 1), 2),
      "temperature": int(pred),
      "humidity": round(uniform(0, 1), 2)
    }
    hours.append(x)
  data["hourly"] = {}
  data["hourly"]["data"] = hours
  return json.dumps(data)
