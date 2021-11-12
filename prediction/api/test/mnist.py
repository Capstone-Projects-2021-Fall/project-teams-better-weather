#!/usr/bin/env python3
import numpy as np
from tensorflow import keras

_, (x_test, y_test) = keras.datasets.mnist.load_data()
x_test = x_test.astype("float32")/255
y_test = keras.utils.to_categorical(y_test, 10)

model = keras.models.load_model("testnet")
for i in range(64):
  samp = np.random.randint(0, x_test.shape[0], size=1)
  x = x_test[samp]
  out = model.call(x)
  print(np.argmax(out.numpy()), np.argmax(y_test[samp]))
