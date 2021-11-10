import tensorflow as tf

class Model(tf.keras.Model):
  def __init__(self):
    super(Model, self).__init__()

    # nn architecture stuff 
    # ...

  def forward(self, x):
    return x
