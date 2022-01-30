from flask import Blueprint, request, jsonify, session, g
from models.article import Article
from models.user import User
from app import analysis_result
from app import db

my_article = Blueprint("my_article", __name__, url_prefix="/api/article")


@my_article.before_app_request
def load_logged_in_user_info():
    user_id = session.get("login_user_id")
    if user_id is None:
        g.user = None
    else:
        g.user = User.query.filter(User.id == user_id).first()


@my_article.route("", methods=["POST"])
def create_article():
    text = request.json["text"]
    date = request.json["date"]

    origin_diary = Article.query.filter((Article.date == date) & (Article.author_id == g.user.id)).first()
    if origin_diary:
        db.session.close()
        return jsonify(result='해당 날짜에 일기가 이미 존재합니다')

    emotion, slang = analysis_result(text)
    is_sharable = slang
    is_shared = False

    new_diary = Article(
        g.user.nickname, g.user.id, text, date, emotion, is_sharable, is_shared
    )
    db.session.add(new_diary)
    db.session.commit()
    return jsonify(result="success")


@my_article.route("/<date>", methods=["GET"])
def get_article(date):
    diary = Article.query.filter(
        (Article.date == date) & (Article.author_id == g.user.id)
    ).first()
    db.session.close()
    if not diary:
        return jsonify(result='해당 날짜에 일기가 없습니다')
    return jsonify(
        date=diary.date.strftime("%Y-%m-%d"),
        text=diary.text,
        emotion=diary.emotion,
        is_shared=diary.is_shared,
        is_sharable=diary.is_sharable,
    )


@my_article.route("/<date>", methods=["PATCH"])
def update_article(date):
    text = request.json["text"]
    diary = Article.query.filter(
        (Article.date == date) & (Article.author_id == g.user.id)
    ).first()
    emotion, slang = analysis_result(text)
    diary.text = text
    diary.emotion = emotion
    diary.is_sharable = slang
    if slang:
        diary.is_shared = False

    db.session.commit()
    return jsonify(result="success")


@my_article.route("/<date>", methods=["DELETE"])
def delete_article(date):
    diary = Article.query.filter(
        (Article.date == date) & (Article.author_id == g.user.id)
    ).first()
    db.session.delete(diary)
    db.session.commit()
    return jsonify(result="success")


@my_article.route("/<date>/<string:emotion>", methods=["PATCH"])
def change_emotion(date, emotion):
    diary = Article.query.filter(
        (Article.date == date) & (Article.author_id == g.user.id)
    ).first()
    diary.emotion = emotion
    db.session.commit()
    return jsonify(result="success")


@my_article.route("/<date>/<int:share>", methods=["PATCH"])
def change_share_status(date, share):
    diary = Article.query.filter(
        (Article.date == date) & (Article.author_id == g.user.id)
    ).first()
    if not diary.is_sharable and share:  # 공유 불가능한데 공유하려고 시도할 시
        return jsonify(result="fail")
    diary.is_shared = share
    db.session.commit()
    return jsonify(result="success")


@my_article.route("/my-list")
def get_my_diarys():
    emotion = request.args.get("emotion")
    if not emotion or emotion == "all":
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
    share_status = request.args.get("share", 0, type=int)
    share_status = [share_status] if share_status else [0, 1]
    sort = request.args.get("sort", 0, type=int)
    sort = Article.date.asc() if sort else Article.date.desc()

    query = Article.query.filter(
        (Article.author_id == g.user.id)
        & (Article.emotion.in_(emotion))
        & (Article.is_shared.in_(share_status))
    ).order_by(sort)
    my_diarys = []
    for diary in query:
        one_diary = {}
        one_diary["date"] = diary.date.strftime("%Y-%m-%d")
        one_diary["text"] = diary.text
        one_diary["emotion"] = diary.emotion
        one_diary["is_shared"] = diary.is_shared
        my_diarys.append(one_diary)
    db.session.close()
    return jsonify(my_diarys)
