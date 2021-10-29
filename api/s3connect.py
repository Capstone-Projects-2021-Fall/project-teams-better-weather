import os
import json
import random
import requests
import boto3
from botocore.exceptions import ClientError

def fetch_data(bucket, coord):
  """
  Fetch hourly weather data from S3
  """
  client = boto3.client('s3')  
  key = f"{coord[0]},{coord[1]}.json"
  if check_exists(client, bucket, key):
    response = client.get_object(Bucket=bucket, Key=key)
  else:
    upload_data(bucket, coord) 
    response = client.get_object(Bucket=bucket, Key=key)
  ret = response["Body"].read().decode()
  return json.loads(ret)

def check_exists(client, bucket, key):
  try: 
    client.head_object(Bucket=bucket, Key=key)
  except ClientError as e:
    return int(e.response['Error']['Code']) != 404
  return True

def upload_data(bucket, coord):
  """
  Upload prediction from model to S3
  """
  client = boto3.client('s3')  
  key = f"{coord[0]},{coord[1]}.json"
  out = get_prediction(coord)
  client.put_object(Body=out, Bucket=bucket, Key=key)

def geocode(location):
  """
  Convert user location search into geographic coordinates
  """
  url = "https://maps.googleapis.com/maps/api/geocode/json"
  api_key = os.environ["GOOGLE_API_KEY"]
  params = {"address": f"{location}", "key": f"{api_key}"}
  r = requests.get(url, params=params)
  results = r.json()["results"][0]
  coord = results["geometry"]["location"]
  return coord["lon"], coord["lat"]

def fetch_currently(location):
  """
  Fetch current weather data from Open Weather API 
  """
  lon, lat = geocode(location) 
  url = "https://api.openweathermap.org/data/2.5/onecall"
  api_key = os.environ["OWM_API_KEY"]
  params = {"lat": f"{lat}", "lon": f"{lon}", "exclude": "hourly,minutely,daily,alerts", "appid": f"{api_key}"}
  r = requests.get(url, params=params)
  return r.json()

def get_prediction(coord):
  """
  Randomly generated predictions for now
  """
  data = {}    
  data["lon"], data["lat"] = coord
  summaries = ["cloudy", "mostly cloudy", "partly cloudy", "clear", "rain", "humid"]
  data["hourly"] = {}
  hours = []
  for i in range(12):
    x = {}
    x["time"] = i 
    x["summary"] = summaries[random.randint(0, len(summaries)-1)]
    x["precipIntensity"] = round(random.uniform(0, 1), 2)
    x["precipProbability"] = round(random.uniform(0, 1), 2)
    x["temperature"] = round(random.uniform(0, 100), 2)
    x["humidity"] = round(random.uniform(0, 1), 2)
    hours.append(x)
  data["hourly"]["data"] = hours
  return json.dumps(data) 


