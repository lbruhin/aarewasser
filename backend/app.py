
# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_cors import cross_origin
import subprocess


app = Flask(__name__)
CORS(app, resources={r"/run_python_script": {"origins": "http://127.0.0.1:3000"},
                            r"/static/*": {"origins": "http://127.0.0.1:3000"}})

@app.route('/run-python-script', methods=['POST', 'OPTIONS'])
@cross_origin(origins="http://127.0.0.1:3000")
def run_python_script():
    if request.method == 'OPTIONS':
        # This branch handles the preflight request.
        response = make_response('')
        response.headers.add("Access-Control-Allow-Origin", "http://127.0.0.1:3000")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        return response, 204

    try:
        # Run your script (ensure the command and script path are correct)
        result = subprocess.run(
            ['python', 'scraper.py'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        return jsonify({
            'message': 'Script executed successfully!',
            'stdout': result.stdout,
            'stderr': result.stderr
        }), 200
    except subprocess.CalledProcessError as e:
        return jsonify({
            'error': f"Script failed with exit code {e.returncode}",
            'stdout': e.stdout,
            'stderr': e.stderr
        }), 500

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Server is running'}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)
