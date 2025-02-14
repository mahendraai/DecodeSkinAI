import numpy as np
import tensorflow as tf
import cv2
from PIL import Image
import io
import base64

# Load pre-trained model (replace with your actual model path)
MODEL_PATH = "model/skin_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# Skin type labels (adjust based on your model's output)
SKIN_TYPES = ["Normal", "Oily", "Dry", "Combination", "Sensitive"]

def preprocess_image(image_base64):
    """
    Decodes a base64-encoded image, preprocesses it, and prepares it for model input.
    """
    # Convert Base64 to Image
    image_data = base64.b64decode(image_base64)
    image = Image.open(io.BytesIO(image_data))

    # Convert to RGB and resize to match model input
    image = image.convert("RGB")
    image = image.resize((224, 224))  # Adjust size based on your model
    img_array = np.array(image)

    # Normalize pixel values (Assume model trained on [0,1] scale)
    img_array = img_array / 255.0

    # Expand dimensions to match the model input shape
    img_array = np.expand_dims(img_array, axis=0)

    return img_array

def analyze_skin(image_base64):
    """
    Runs the model on the image and returns the analysis results.
    """
    try:
        # Preprocess the image
        processed_image = preprocess_image(image_base64)

        # Run the model prediction
        prediction = model.predict(processed_image)

        # Extract values from prediction
        blemish_score = float(prediction[0][0])  # Assuming first value is for blemish detection
        skin_type_index = np.argmax(prediction[0][1:])  # Get index of highest probability for skin type
        skin_type = SKIN_TYPES[skin_type_index]

        # Determine if blemishes exist (Assuming threshold of 0.5)
        has_blemishes = blemish_score > 0.5

        # Final score (could be confidence level or custom logic)
        overall_score = round((1 - blemish_score) * 100, 2)  # Example: Higher score = healthier skin

        return {
            "blemishes": has_blemishes,
            "skinType": skin_type,
            "score": overall_score
        }

    except Exception as e:
        print("Error processing image:", str(e))
        return {"error": "Failed to analyze image"}

