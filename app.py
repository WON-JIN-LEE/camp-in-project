from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

import settings
SECRET_KEY = getattr(settings, "SECRET_KEY", "localhost")

from pymongo import MongoClient

client = MongoClient(SECRET_KEY, 27017, authSource="admin")
db = client.cp
dblist=client.cplists

## main HTML 화면 보여주기
@app.route('/')
def home():
    all_list = list(dblist.cplist.aggregate([{"$sample": {"size": 27}}, {"$unset": "_id"}]))
    return render_template('main.html',all_list=all_list, username="WONJIN")

# 검색 API  
@app.route('/search', methods=['GET'])
def get_list():
    area_receive = request.args.get('area_give')
    search_receive = request.args.get('search_give')
    print(area_receive)
    print(search_receive)

    # 검색 data 추출
    search_list =  list(dblist.cplist.find({'$and': [ {'area': {"$regex": f"{area_receive}"}} ,{'$or':[ {'title': {"$regex": f"{search_receive}"}},{'comment': {"$regex": f"{search_receive}"}},{'desc': {"$regex": f"{search_receive}"}}]}]},{'_id': False}).sort("views", -1))

    return jsonify({'msg':'sucess',"documents":search_list})


@app.route('/detail/<id>')
def detail_page(id):
    print(id)
    return render_template('main.html')



# 주문하기(POST) API
@app.route('/posting')
def posting_home():
    return render_template('posting.html')
    

# 주문 목록보기(Read) API
@app.route('/api/post', methods=['GET'])
def view_post():
    posts = list(db.posting.find({},{'_id':False}))
    return jsonify({'all_posts': posts})

# 주문 목록보기(Read) API
@app.route('/api/post', methods=['POST'])
def make_post():
    title_receive = request.form['title_give']
    content_receive = request.form['content_give']
    name_receive = request.form['name_give']



    doc = {
        'title': title_receive,
        'content': content_receive,
        'name': name_receive,
    }

    db.posting.insert_one(doc)
    return jsonify({'msg': '저장완료~!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

