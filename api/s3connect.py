import os
import json
import random
import boto3
from botocore.exceptions import ClientError

def fetch_data(bucket, location):
  """
  Fetch hourly weather data from S3
  """
  client = boto3.client('s3')  
  key = f"{location[0]}{location[1]}.json"
  if check_exists(client, bucket, key):
    response = client.get_object(Bucket=bucket, Key=key)
  else:
    upload_data(bucket, location) 
    response = client.get_object(Bucket=bucket, Key=key)
  ret = response["Body"].read().decode()
  return ret 

def check_exists(client, bucket, key):
  try: 
    client.head_object(Bucket=bucket, Key=key)
  except ClientError as e:
    return int(e.response['Error']['Code']) != 404
  return True

def upload_data(bucket, location):
  """
  Upload prediction from model to S3
  """
  client = boto3.client('s3')  
  key = f"{location[0]}{location[1]}.json"
  out = get_prediction(location)
  client.put_object(Body=out, Bucket=bucket, Key=key)

def get_prediction(location):
  """
  Randomly generated predictions for now
  """
  data = {}    
  data["latitude"] = location[0]
  data["longitude"] = location[1]
  data["hourly"] = {}
  ret = []
  for i in range(12):
    x = {}
    x["time"] = i 
    x["summary"] = "bro"
    x["precipIntensity"] = round(random.uniform(0, 1), 2)
    x["precipProbability"] = round(random.uniform(0, 1), 2)
    x["temperature"] = round(random.uniform(0, 100), 2)
    x["humidity"] = round(random.uniform(0, 1), 2)
    ret.append(x)
  data["hourly"]["data"] = ret
  return json.dumps(data) 
