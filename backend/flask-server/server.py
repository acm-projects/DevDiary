from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/', methods=['GET'])
def get_data():
    sample_data = {"message": "Hello, World!"}
    return jsonify(sample_data)

if __name__ == '__main__':
    app.run(debug=True)