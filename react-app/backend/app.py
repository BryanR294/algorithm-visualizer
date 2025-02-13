from flask import Flask, jsonify, request
from flask_cors import CORS
import seaborn as sns
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
import base64
import io
import logging

matplotlib.use('Agg')
# Follow REST principles 
# GET, POST, PUT, DELETE
# example: GET /tasks/<id>

# Flask and CORS set-up
array = [1,2,3,4,5]

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})  # This enables CORS for all routes (make sure to configure it for production!)

@app.route('/api/data', methods=['GET'])
def get_array():
    global array
    np_array = np.array(array)
    
    
    fig, ax = plt.subplots()
    ax.bar(range(len(np_array)), np_array)
    ax.set_xlabel('Index')
    ax.set_ylabel('Value')
    
    # Encodes image into a JSON compatible format
    buf = io.BytesIO()
    fig.savefig(buf,format="png")
    buf.seek(0)
    encoded_image = base64.b64encode(buf.read()).decode('utf-8')
    plt.close(fig)
    
    logging.info("GET request received, sending graph data")
    return jsonify({"image": encoded_image})

@app.route('/api/data', methods=['POST'])
def update_array():
    global array
    data = request.json  # Parse JSON payload from the request
    if 'array' in data:
        array = data['array']
        logging.debug(f"Current backend array: {array}")
        return jsonify({"message": "Array updated successfully!", "array": array}), 200
    else:
        return jsonify({"error": "Invalid input: 'array' not provided"}), 400

if __name__ == '__main__':
    app.run(debug=True)
