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
    history = trns.copy()
    for t in range(30):
        model = ARIMA(history, order=(12,2,1))
        model_fit = model.fit()
        output = model_fit.forecast()
        yhat = max(output[0],0)
        predictions.append(yhat)
        history.append(yhat)
        # trns.append(yhat)
    return predictions

max_length = 256
trunc_type = 'pre'
padding_type = 'pre'
labels = ['Bills', 'Credit', 'Eating', 'Health', 'Housing', 'Leisure',
       'Mortgages', 'Other', 'Profits', 'Shopping', 'Taxes', 'Transfer',
       'Travels', 'Wages']

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
    print(sequence)
    if len(sequence) == 0:
        return 'OTHER'
    padded = pad_sequences([sequence], maxlen=max_length, padding=padding_type, truncating=trunc_type)

    y = np.array(model.predict(padded).argmax())
    return labels[y]

from transformers import AutoModelForSequenceClassification, AutoTokenizer

transformer_model = AutoModelForSequenceClassification.from_pretrained("mgrella/autonlp-bank-transaction-classification-5521155")
transformer_tokenizer = AutoTokenizer.from_pretrained("mgrella/autonlp-bank-transaction-classification-5521155")

def get_category2(text):
    inputs = transformer_tokenizer(text, return_tensors="pt")
    logits = transformer_model(**inputs).logits
    predicted_class_id = logits.argmax().item()
    
    return transformer_model.config.id2label[predicted_class_id].split('.')[1].split('_')[0]

