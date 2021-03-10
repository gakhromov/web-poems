import time
import random

from flask import Flask, request
from flask_pymongo import PyMongo,pymongo
from flask_cors import CORS 
import pusher

from src.poem_grader import get_poem_info, grade_poem
import src.vault as vault

import json
from bson import json_util

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://grishauser:grishapass@webpoemsmongo.nbpsd.mongodb.net/app?retryWrites=true&w=majority'
CORS(app)

mongo = PyMongo(app)
leaderboard = mongo.db.leaderboard
neuropoems = mongo.db.neuropoems

print(mongo.db.list_collection_names())

pusher_client = pusher.Pusher(
  app_id='1167807',
  key='b45c83f8898eace14a49',
  secret='a714f5d07743e455467c',
  cluster='eu',
  ssl=True
)

#special json encoder for ObjectId BSON's fields
def parse_json(data):
    return json.loads(json_util.dumps(data))

@app.route('/delete/shit', methods = ['POST'])
def deleteDataInDBEspesiallyForGrigoryKhromov():
    res = leaderboard.delete_many({})
    return {"message":f' deleted {res.deleted_count} pieces of shit'}, 200


@app.route('/leaderboard', methods = ['POST'])
def readFullLeaderBoard():
    singlemode = request.json['single']
    amount = request.json['amount']
    try:
        amount = int(amount)
    except:
        amount = 100

    if singlemode:
        result =  mongo.db.leaderboard.find({"playersamount":1},projection={"_id": 0})
    else:
        result =  mongo.db.leaderboard.find({"playersamount":{"$gt":1}},projection={"_id": 0})

    result.sort('generalscore',pymongo.DESCENDING).limit(amount)

    list_ = [doc for doc in result]

    return {"leaderboard":list_}, 200







@app.route('/')
def hello_world():
    return 'Hello, World!'


def postIntoDB(poem,userscores,generalscore):
    leaderboard.insert_one({"userscores":userscores,
                            "poem":poem,
                            "generalscore":generalscore,
                            "playersamount":len(userscores)})


@app.route('/poem-info', methods=['POST'])
def poem_info():
    poem = request.json['poem']
    username = request.json['username']
    info = get_poem_info(poem)
    grades = grade_poem(info)
    score = grades['poem']
    rank = leaderboard.count_documents({"playersamount":1 ,'generalscore':{'$gt':score}}) + 1
    postIntoDB(poem, [{'username':username,'score':score}], score)
    return {
        'info': info,
        'grades': grades,
        'rank' : rank
    }, 200


# @app.route('/game/new', methods=['POST'])
# def create_new_game():
#     username = request.json['username']
#     session_id = hash(time.time())
#     vault.sessions[session_id] = {}
#     vault.sessions[session_id]['player'] = username
#     return {
#         'session_id': str(session_id)
#     }, 200


# @app.route('/game/join', methods=['POST'])
# def join_game():
#     username = request.json['username']
#     session_id = int(request.json['session_id'])
#     if session_id not in vault.sessions.keys():
#         print('Session not in db')
#         return {}, 400
#     if username in vault.sessions[session_id]['players']:
#         print('Same player not allowed')
#         return {}, 400
#     vault.sessions[session_id]['players'].append(username)
#     return {}, 200



# @app.route('/game/players', methods=['GET'])
# def get_players():
#     session_id = request.json['session_id']
#     if session_id not in vault.sessions.keys():
#         return {}, 400
#     return {'players': vault.sessions[session_id]['players']}, 200


@app.route('/game/start', methods=['POST'])
def start_game():
    username = request.json['username']
    session_id = hash(time.time())
    vault.sessions[session_id] = {}
    vault.sessions[session_id]['player'] = username

    # if session_id not in vault.sessions.keys():
    #     return {}, 400

    # playersAmount = len(vault.sessions[session_id]['players'])
    # if playersAmount < 2:
    #     return {'Not enough players'} , 420
    
    
    # maxLines = len(vault.sessions[session_id]['players']) * 4
  
    maxLines = 16
    vault.sessions[session_id]['max_lines'] = maxLines

    neuropoemsAmount = maxLines/8
    neuropoemsCur = neuropoems.aggregate([{ '$sample': { 'size': neuropoemsAmount } }])
    neurolines = []
    for poemDoc in neuropoemsCur:
        neurolines.extend(poemDoc['poem'].split('\n'))
    

    # random.shuffle(vault.sessions[session_id]['players'])

    lines = [{
        'line': neurolines[0],
        'player': None,
    },
    {
        'line': neurolines[1],
        'player': None,
    },
    {
        'line': None,
        'player': vault.sessions[session_id]['player']
    },
    {
        'line': None,
        'player': vault.sessions[session_id]['player']
    }]

    vault.sessions[session_id]['lines'] = lines
    # pusher_client.trigger(f'session_{session_id}', 'lines', lines)
    return {'session_id': str(session_id), 'lines': lines}, 200


@app.route('/game/submit', methods=['POST'])
def submit_lines():
    session_id = int(request.json['session_id'])
    if session_id not in vault.sessions.keys():
        return {}, 400
    line1 = request.json['line1']
    line2 = request.json['line2']
    # username = request.json['username']
    # if username != vault.sessions[session_id]['lines'][-1]['player']:
    #     return {}, 400
    vault.sessions[session_id]['lines'][-2]['line'] = line1
    vault.sessions[session_id]['lines'][-1]['line'] = line2

    if len(vault.sessions[session_id]['lines']) >= vault.sessions[session_id]['max_lines']:
        poem = '\n'.join([lines['line'] for lines in vault.sessions[session_id]['lines']])
        info = get_poem_info(poem)
        grades = grade_poem(info)
        

        # userGrades=[{user:0} for user in vault.sessions[session_id]['players']]
        userGrades = 0
        for id_,lineInfo in enumerate(vault.sessions[session_id]['lines']):
            if lineInfo['player'] != None:
                userGrades+=grades[str(id_)]['points']
        # userGrades = [{'username' : k,'score' : v } for k,v in userGrades.items()]
        score = userGrades
        rank = leaderboard.count_documents({"playersamount": {'$gt':1} ,'generalscore':{'$gt':score}}) + 1
        
        postIntoDB(poem, 
                [
                    {
                        'username':vault.sessions[session_id]['player'],
                        'score':userGrades
                    },
                    {
                        'username':NN,
                        'score':-999,
                    }
                ], 
                score)

        return {
            'info': info,
            'grades': score,
            'rank' : rank
        }, 201

    # new_player = (len(vault.sessions[session_id]['lines'])-2) % len(vault.sessions[session_id]['players'])

    vault.sessions[session_id]['lines'].extend(
    [{
        'line': neurolines[len(vault.sessions[session_id]['lines']/2+1)],
        'player': None,
    },
    {
        'line': neurolines[len(vault.sessions[session_id]['lines']/2+2)],
        'player': None,
    },
    {
        'line': None,
        'player': vault.sessions[session_id]['player']
    },
    {
        'line': None,
        'player': vault.sessions[session_id]['player']
    }])

    # pusher_client.trigger(f'session_{session_id}', 'lines', vault.sessions[session_id]['lines'])
    return {vault.sessions[session_id]['lines']}, 200




if __name__ == '__main__':
  app.run(host='0.0.0.0', port=9000, debug=True)
