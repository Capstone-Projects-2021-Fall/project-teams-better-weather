import random
from flask import Flask, request, jsonify
from s3connect import fetch_data

BUCKET = "bw-preds"
app = Flask(__name__)

@app.route('/hourly/', methods=['GET'])
def get_hourly():
  coord = request.args.get("coord").split(",")
  response = jsonify(fetch_data(BUCKET, coord))
  response.headers.add("Access-Control-Allow-Origin", "*")
  return response

