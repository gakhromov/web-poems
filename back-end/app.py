import time
import random

from flask import Flask, request
import pusher

from src.poem_grader import get_poem_info, grade_poem
import src.vault


app = Flask(__name__)
pusher_client = pusher.Pusher(
  app_id='1167807',
  key='b45c83f8898eace14a49',
  secret='a714f5d07743e455467c',
  cluster='eu',
  ssl=True
)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/poem-info', methods=['POST'])
def poem_info():
    poem = request.json['poem']
    username = request.json['username']
    info = get_poem_info(poem)
    grades = grade_poem(info)
    return {
        'info': info,
        'grades': grades,
    }, 200


@app.route('/game/new', methods=['POST'])
def create_new_game():
    username = request.json['username']
    session_id = hash(time.time())
    vault.sessions[session_id]['players'] = [username]
    return {
        'session_id': session_id
    }, 200


@app.route('/game/join', methods=['POST'])
def join_game():
    username = request.json['username']
    session_id = request.json['session_id']
    if session_id not in vault.sessions.keys():
        return {}, 400
    if username in vault.sessions[session_id]['players']:
        return {}, 400
    vault.sessions[session_id]['players'].append(username)
    return {}, 200


@app.route('/game/players', methods=['GET'])
def get_players():
    session_id = request.json['session_id']
    if session_id not in vault.sessions.keys():
        return {}, 400
    return {'players': vault.sessions[session_id]['players']}, 200


@app.route('/game/start', methods=['POST'])
def start_game():
    session_id = request.json['session_id']
    if session_id not in vault.sessions.keys():
        return {}, 400

    random.shuffle(vault.sessions[session_id]['players'])

    lines = [{
        'line': 'Как прекрасна утром весна',
        'player': None,
    },
    {
        'line': None,
        'player': vault.sessions[session_id]['players'][0]
    }
    ]        
    vault.sessions[session_id]['lines'] = lines
    pusher_client.trigger(f'session_{session_id}', 'lines', lines)
    return {}, 200


@app.route('/game/submit', methods=['POST'])
def submit_line():
    session_id = request.json['session_id']
    if session_id not in vault.sessions.keys():
        return {}, 400
    new_line = request.json['new_line']
    username = request.json['username']
    if username != vault.sessions[session_id]['lines'][-1]['player']:
        return {}, 400
    vault.sessions[session_id]['lines'][-1]['line'] = new_line

    new_player = (len(vault.sessions[session_id]['lines'])-1) % len(vault.sessions[session_id]['players'])

    vault.sessions[session_id]['lines'].append({
        'line': None,
        'player': vault.sessions[session_id]['players'][new_player]
    })
    pusher_client.trigger(f'session_{session_id}', 'lines', vault.sessions[session_id]['lines'])
    return {}, 200


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=9000, debug=True)
