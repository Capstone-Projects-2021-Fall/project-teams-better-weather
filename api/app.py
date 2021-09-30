from flask import Flask
import random

app = Flask(__name__)

@app.route('/currently')
def get_currently():
  return {'currentTemp': random.randint(0, 100)}

