from flask import Flask, request, jsonify
import tensorflow as tf
import transformers
from transformers import AutoTokenizer, BartForConditionalGeneration
from tensorflow.keras.models import Sequential, save_model, load_model
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

model_bert = tf.keras.models.load_model(('../Models/BERT_toxicity_detector.h5'),custom_objects={'TFBertMainLayer':transformers.TFBertModel},compile=False)
tokenizer_bert = transformers.BertTokenizer.from_pretrained("bert-base-uncased")

model_bart = BartForConditionalGeneration.from_pretrained("../Models/BART_detox")
tokenizer_bart = AutoTokenizer.from_pretrained("../Models/BART_detox")

def detox(text):
    tokenized_text = tokenizer_bert(
              text=text,
              padding='max_length',
              max_length=64,
              return_tensors='np',
              truncation=True,
              return_token_type_ids=False,
              return_attention_mask=True
          )

    # We extract the probability
    y_pred = model_bert.predict([tokenized_text["input_ids"], tokenized_text["attention_mask"]])[0][0]

    if y_pred < 0.5:
      return text
    else:
      inputs = tokenizer_bart([text], max_length=64, return_tensors="pt")
      input_ids = model_bart.generate(inputs["input_ids"])
      return (tokenizer_bart.batch_decode(input_ids)[0].replace('</s>','')).replace('<s>','')

@app.route('/')
def test():
   return "Server online"

@app.route('/detox', methods=["POST"])
def bert():
     input_json = request.get_json(force=True) 
     res = detox(input_json['text'])
     return jsonify({'text':res})