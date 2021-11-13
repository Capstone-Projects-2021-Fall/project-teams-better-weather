import os
import json
import requests
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv
load_dotenv()

def fetch_hourly(bucket, coord):
  """
  Fetch hourly weather data from S3
  """
  client = boto3.client('s3')  
  key = f"{coord[0]},{coord[1]}.json"
  if check_exists(client, bucket, key):
    response = client.get_object(Bucket=bucket, Key=key)
  else:
    resp = call_prediction(coord)
    if resp.status_code != 200: 
      ret = None
    response = client.get_object(Bucket=bucket, Key=key)
  ret = response["Body"].read().decode()
  return json.loads(ret)

def check_exists(client, bucket, key):
  try: 
    client.head_object(Bucket=bucket, Key=key)
  except ClientError as e:
    return int(e.response['Error']['Code']) != 404
  return True

def call_prediction(coord):
  """
  Call model to make a prediction
  """
  lon, lat = coord
  url = "https://pred.betterweather.xyz/preds"
  params = {"hourly": f"{lon},{lat}"} 
  r = requests.get(url, params=params)
  return r.json()

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
  if (len(r.json()["results"]) != 0):
    results = r.json()["results"][0]
    coord = results["geometry"]["location"]
    address = results["formatted_address"]
    return coord["lng"], coord["lat"], address
  return None, None, None

def fetch_currently(location):
  """
  Fetch current weather data from Open Weather API 
  """
  lon, lat, address = geocode(location) 
  url = "https://api.openweathermap.org/data/2.5/onecall"
  api_key = os.environ["OWM_API_KEY"]
  params = {"lat": f"{lat}", "lon": f"{lon}", "exclude": "hourly,minutely,daily,alerts", "units": "metric", "appid": f"{api_key}"}
  r = requests.get(url, params=params)
  
  # theres gotta be a better way
  ret = {}
  ret["currently"] = r.json()
  ret["currently"]["address"] = address  
  print(ret)
  return ret

def fetch_forecast(bucket, location):
  """
  In progress..
  """
  lon, lat = geocode(location) 
  url = "https://api.openweathermap.org/data/2.5/onecall"
  api_key = os.environ["OWM_API_KEY"]
  params = {"lat": f"{lat}", "lon": f"{lon}", "exclude": "hourly,minutely,daily,alerts", "appid": f"{api_key}"}
  r = requests.get(url, params=params)
  
  data = fetch_data(bucket, (lon, lat))
  data["currently"] = r.json()["current"]
  data["hourly"] = data.pop("hourly")
  print(data)
  #print(r.json()["current"])
  return data

