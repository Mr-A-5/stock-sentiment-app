import requests
from config.config import HUGGING_FACE_KEY
API_URL = "https://router.huggingface.co/hf-inference/models/ProsusAI/finbert"
headers = {
    "Authorization": f"Bearer {HUGGING_FACE_KEY}",
}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def getSentiment(input: str):
    output = query({
        "inputs": input,
    })
    return output[0]


    