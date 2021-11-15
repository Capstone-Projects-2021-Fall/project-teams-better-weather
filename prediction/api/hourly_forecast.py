#!/usr/bin/env python3
from s3connect import * 

# crontab -e
# 03 * * * * ./hourly_forecast.py

s3 = boto3.resource("s3")
bucket = s3.Bucket("bw-preds")
for obj in bucket.objects.all():
  coord = obj.key.replace(".json", "").split(",")
  if len(coord) == 2:
    upload_data("bw-preds", coord)
