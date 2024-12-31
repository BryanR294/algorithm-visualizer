from flask import Flask, jsonify, request
from flask_cors import CORS
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt
import io


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})  # This enables CORS for all routes (make sure to configure it for production!)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Python API!'}
    return jsonify(data)

@app.route('/api/process', methods=['POST'])
def visualize_array():
    print('endpoint accessed')
    array = request.json
    numpy_array = np.array([array]) 
    
    plt.figure()
    # sns.histplot(numpy_array, kde=True)

    # # Save the plot to an in-memory buffer
    # buffer = io.BytesIO()
    # plt.savefig(buffer, format='png')
    # buffer.seek(0)
    # plt.close()

    # # Return the plot as a response
    # return send_file(buffer, mimetype='image/png')
    data = {'message': '/process endpoint reached'}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
