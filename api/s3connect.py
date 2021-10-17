import os
import boto3

def fetch_data(bucket, location):
  client = boto3.client('s3',
    aws_access_key_id=os.environ['AWS_KEY_ID'],
    aws_secret_access_key=os.environ['AWS_SECRET_KEY']
  )  
  ret = client.get_object(Bucket=bucket, Key=location)
  data = ret["Body"].read().decode()
  return data
