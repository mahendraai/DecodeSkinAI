from flask import Flask, request, jsonify
import base64
from io import BytesIO
from PIL import Image
import numpy as np

app = Flask(__name__)

@app.route('/api/analyze', methods=['POST'])
def analyze_skin():
    data = request.json
    photo_base64 = data['photo']
    photo_data = base64.b64decode(photo_base64)
    image = Image.open(BytesIO(photo_data))

    # Here, use your model to analyze the image
    # For demonstration purposes, we're just returning dummy data
    result = {
        'blemishes': True,
        'skinType': 'Oily',
        'score': 88.5
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
