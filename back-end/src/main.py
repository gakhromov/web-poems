from flask import Flask, request

from poem_grader import get_poem_info 


app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/poem-info', methods=['POST'])
def poem_info():
    poem = request.json['poem']
    return get_poem_info(poem)


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=9000, debug=True)
