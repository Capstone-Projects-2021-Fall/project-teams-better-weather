#!/usr/bin/env python3
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

(x_train, y_train), (_, _) = keras.datasets.mnist.load_data()
x_train = x_train.astype("float32")/255
y_train = keras.utils.to_categorical(y_train, 10)

model = keras.models.load_model("testnet")
samp = np.random.randint(0, x_train.shape[0], size=1)
x = x_train[samp]
out = model.call(x)
print(np.argmax(out.numpy()), np.argmax(y_train[samp]))
