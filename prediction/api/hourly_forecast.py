#!/usr/bin/env python3
from s3connect import * 

# crontab -e
# 03 * * * * ./hourly_forecast

client = boto3.resource("s3")
bucket = s3.Bucket("bw-preds")
for obj in bucket.objects.all():
  coord = obj.key.replace(".json", "").split(",")
  upload_data("bw-preds", coord)
  
