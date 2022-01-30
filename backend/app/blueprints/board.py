from flask import Blueprint, request, jsonify, session, g
from models.sympathy import Sympathy
from models.article import Article
from models.user import User

from app import db

board = Blueprint('board', __name__, url_prefix='/api/board')

@board.before_app_request
def load_logged_in_user_info():
    user_id = session.get('login_user_id')
    if user_id is None:
        g.user = None
    else:
        g.user = User.query.filter(User.id == user_id).first()

@board.route('/article/<int:article_id>/<sympathize>', methods=['DELETE'])
def delete_sympathy(article_id, sympathize):
    if sympathize: 
        sympathy_on_diary = Sympathy.query.filter((Sympathy.article_id == article_id) & (Sympathy.user_id == g.user.id)).first()
        db.session.delete(sympathy_on_diary)
        db.session.commit()
        return jsonify(result='success')

@board.route('/sympathy', methods=['GET'])
def get_sympathized_article():
    emotion = request.args.get('emotion')
    if not emotion or emotion == 'all':
        emotion = [
            "fear",
            "surprise",
            "anger",
            "sadness",
            "neutrality",
            "happiness",
            "disgust",
        ]
    else:
        emotion = [emotion]

    query = Sympathy.query.filter(Sympathy.user_id == g.user.id).all()
    sympathized_articles_id = []
    for article in query:
        sympathized_articles_id.append(article.article_id)
    sympathized_articles_info = []
    for article_id in sympathized_articles_id:
        article = Article.query.filter(Article.id == article_id).first()
        if article.is_shared and article.emotion in emotion: 
            one_article = {}
            one_article['date'] = article.date.strftime('%Y-%m-%d')
            one_article['text'] = article.text
            one_article['emotion'] = article.emotion
            one_article['article_id'] = article.id
            article_date_to_int = int(one_article['date'].replace('-', ''))
            sympathy_count = len(Sympathy.query.filter(Sympathy.article_id == article_id).all())
            sympathized_articles_info.append((one_article, article_date_to_int, sympathy_count))
    
    date_sort = request.args.get('date_sort', 0, type=int)
    sympathy_sort = request.args.get('sympathy_sort', 0, type=int)
    if not date_sort and not sympathy_sort:
        sort = lambda x: -x[1]
    elif not date_sort and sympathy_sort:
        sort = lambda x: (-x[2], -x[1])
    elif date_sort and not sympathy_sort:
        sort = lambda x: x[1]
    else:
        sort = lambda x: (-x[2], x[1])
    sorted_sympathized_articles = sorted(sympathized_articles_info, key=sort)
    filtered_and_sorted_articles = []
    for sorted_sympathized_article in sorted_sympathized_articles:
        filtered_and_sorted_articles.append(sorted_sympathized_article[0])

    db.session.close()
    return jsonify(filtered_and_sorted_articles)