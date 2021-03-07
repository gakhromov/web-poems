from flask import Flask, request

from poem_grader import get_poem_info, grade_poem


app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/poem-info', methods=['POST'])
def poem_info():
    poem = request.json['poem']
    return get_poem_info(poem)


@app.route('/grade-poem', methods=['POST'])
def grade_poem_request():
    if 'info' in request.json.keys():
        info = request.json['info']
    else:
        poem = request.json['poem']
        info = get_poem_info(poem)
    return grade_poem(info)


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=9000, debug=True)
