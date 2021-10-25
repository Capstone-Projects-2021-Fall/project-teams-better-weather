import json
import random
import boto3
from botocore.exceptions import ClientError
import requests
import os

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
  return ret 

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

def fetch_currently(location):
  api_key = os.environ["OWM_API_KEY"]
  #lon, lat = coord[0], coord[1]
  #response = requests.get(f"https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=hourly,minutely,daily,alerts&appid={api_key}")
  response = requests.get(f"https://api.openweathermap.org/data/2.5/weather?q={location}&units=metric&appid={api_key}")
  print(json.dumps(response.json(), indent=2))
  return response.json()

def get_prediction(coord):
  """
  Randomly generated predictions for now
  """
  data = {}    
  data["lon"], data["lat"] = coord[0], coord[1]
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


