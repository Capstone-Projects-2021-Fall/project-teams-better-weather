import random
from flask import Flask, request, jsonify
from s3connect import upload_data

BUCKET = "bw-preds"
app = Flask(__name__)

@app.route('/')
def get_hourly():
  return "<h1>whats up</h1>"

@app.route('/preds/', methods=['GET'])
def get_predictions():
  coord = request.args.get("coord").split(",")
  response = jsonify(upload_data(BUCKET, coord))
  response.headers.add("Access-Control-Allow-Origin", "*")
  return response

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


