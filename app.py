from flask import Flask, request, jsonify

app = Flask(__name__)

high_scores = []

@app.route('/submit-score', methods=['POST'])
def submit_score():
    data = request.json
    username = data.get('username')
    score = data.get('score')
    high_scores.append({'username': username, 'score': score})
    return jsonify({'message': 'Score submitted successfully!'}), 200

@app.route('/high-scores', methods=['GET'])
def get_high_scores():
    sorted_scores = sorted(high_scores, key=lambda x: x['score'], reverse=True)
    return jsonify(sorted_scores), 200

if __name__ == '__main__':
    app.run(debug=True)
