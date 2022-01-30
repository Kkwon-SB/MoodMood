import re
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from models.user import User
from app import db

signup = Blueprint("signup", __name__, url_prefix='/api')

email_validation = re.compile("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
password_validation = re.compile(
    "^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%*^&+=]).*$"
)
nickname_validation = re.compile("^[a-zA-Z가-힣0-9]+$")


@signup.route("/signup", methods=["POST"])
def user_signup():
    email = request.json["email"]
    password = request.json["password"]
    password_check = request.json["password_check"]
    nickname = request.json["nickname"]

    if email == "" or password == "":
        return jsonify(result="KEY_ERROR")
    if not email_validation.match(email):
        return jsonify(result="EMAIL_VALIDATION_ERROR")
    if not password_validation.match(password) or password != password_check:
        return jsonify(result="PASSWORD_VALIDATION_ERROR")
    if not nickname_validation.match(nickname):
        return jsonify(result="NICKNAME_VALIDATION_ERROR")
    if User.query.filter(User.email == email).first():
        return jsonify(result="Registered email")
    if User.query.filter(User.nickname == nickname).first():
        return jsonify(result="Registered nickname")

    password = generate_password_hash(password)
    photo = "../static/uploads/basic_photo/basic_photo.png"

    user = User(email=email, password=password, nickname=nickname, photo=photo)
    db.session.add(user)
    db.session.commit()

    return jsonify(result="success", status=200)
