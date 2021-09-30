from flask import Flask
import random

app = Flask(__name__)

@app.route('/current')
def get_current():
  return {'current': random.randint(0, 100)}


