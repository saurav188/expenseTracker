from statsmodels.tsa.arima.model import ARIMA
from tensorflow.keras.preprocessing.sequence import pad_sequences
import tensorflow as tf
from tensorflow.keras.models import model_from_json
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Bidirectional, Dense
import json
import numpy as np
import pickle

# walk-forward validation
def get_time_series(trns):
    predictions = []
    for t in range(28):
        model = ARIMA(trns, order=(6,1,1))
        model_fit = model.fit()
        output = model_fit.forecast()
        yhat = max(output[0],0)
        predictions.append(yhat)
        trns.append(yhat)
    return predictions

max_length = 256
trunc_type = 'pre'
padding_type = 'pre'
labels = ['BILLS', 'CREDIT', 'EATING', 'HEALTH', 'HOUSING', 'LEISURE',
       'MORTGAGES', 'OTHER', 'PROFITS', 'SHOPPING', 'TAXES', 'TRANSFERS',
       'TRAVELS', 'WAGES']

with open('./models/word_index.json', 'rb') as handle:
    tokenizer = json.load(handle)
    

# Load the model architecture from the JSON file
with open('./models/model.json', 'r') as json_file:
    model_json = json_file.read()
model = model_from_json(model_json, custom_objects={
    'Sequential': Sequential,
    'Embedding': Embedding,
    'LSTM': LSTM,
    'Bidirectional': Bidirectional,
    'Dense': Dense
})
model.load_weights('./models/model.h5')
# /Users/sauravthakur/Desktop/Github/expenseTracker/moneyTracker/models/text_classification.keras
def tokenize(input):
    temp = input.split(' ')
    result = []
    for i in temp:
        if i in tokenizer.keys():   
            result.append(tokenizer[i])
    return np.array(result)
    

def get_category(input):
    sequence = tokenize(input)
    padded = pad_sequences([sequence], maxlen=max_length, padding=padding_type, truncating=trunc_type)

    y = np.array(model.predict(padded).argmax())
    return labels[y]



