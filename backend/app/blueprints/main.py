from flask import Blueprint, request, jsonify, session, g
from models.article import Article
from models.user import User
from app import db

from datetime import datetime

main = Blueprint('main', __name__, url_prefix='/api')

@main.before_app_request
def load_logged_in_user_info():
    user_id = session.get('login_user_id')
    if user_id is None:
        g.user = None
    else:
        g.user = User.query.filter(User.id == user_id).first()

@main.route('/main', methods=['GET'])
def main_info():
    year = datetime.now().strftime("%Y")
    month = int(datetime.now().strftime("%m"))
    month = f'{month:02d}'
    year = request.args.get('year', year)
    month = request.args.get('month', month)
    year_month = f'{year}-{month}'

    query = Article.query.filter((Article.author_id == g.user.id) & Article.date.like(f'{year_month}%')).order_by(Article.date.asc())
    year_month_diarys = []
    for diary in query:
        one_diary = {}
        one_diary['date'] = diary.date.strftime('%Y-%m-%d')
        one_diary['text'] = diary.text
        one_diary['emotion'] = diary.emotion
        year_month_diarys.append(one_diary)
    
    db.session.close()
    return jsonify(year_month_diarys)