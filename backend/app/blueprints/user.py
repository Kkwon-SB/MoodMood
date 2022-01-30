from flask import Blueprint, request, jsonify, session, g
from werkzeug.security import generate_password_hash
from models.user import User

from datetime import datetime
from hashlib import sha256
import re

from app import db

user = Blueprint('user', __name__, url_prefix='/api')

password_validation = re.compile("^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%*^&+=]).*$")
nickname_validation = re.compile("^[a-zA-Z가-힣0-9]+$")

@user.before_app_request
def load_logged_in_user_info():
    user_id = session.get('login_user_id')
    if user_id is None:
        g.user = None
    else:
        g.user = User.query.filter(User.id == user_id).first()

@user.route('/user', methods=['GET'])
def get_user_info():
    user = User.query.filter(User.id == g.user.id).first()
    db.session.close()
    return jsonify(photo = user.photo, email = user.email, nickname = user.nickname)

@user.route('/user', methods=['PATCH'])
def update_user_info():
    password = request.form['password']
    password_check = request.form['password_check']
    nickname = request.form.get('nickname')
    user = User.query.filter(User.id == g.user.id).first()

    if not password_validation.match(password) or password != password_check:
        return jsonify(result="PASSWORD_VALIDATION_ERROR")
    password = generate_password_hash(password)
    user.password = password 
    if nickname:
        if not nickname_validation.match(nickname):
            return jsonify(result="NICKNAME_VALIDATION_ERROR")
        if User.query.filter(User.nickname == nickname).first():
            return jsonify(result='Registered nickname')
        user.nickname = nickname

    db.session.commit()
    return jsonify(result='success')

@user.route('/user/image', methods=['PATCH'])
def update_user_image():
    user = User.query.filter(User.id == g.user.id).first()
    photo = request.files['photo']
    mixed_photo_filename = photo.filename + datetime.now().strftime("%m/%d/%Y, %H:%M:%S") + user.email
    m = sha256()
    m.update(mixed_photo_filename.encode('utf-8'))
    hashed_photo_filename = m.hexdigest()+'.jpg'
    photo_location = 'static/uploads/' + hashed_photo_filename
    photo.save(photo_location)
    user.photo = '../' + photo_location
    db.session.commit()
    return jsonify(result='success')

@user.route('/user/image', methods=['DELETE'])
def delete_user_image():
    user = User.query.filter(User.id == g.user.id).first()
    user.photo = "../static/uploads/basic_photo/basic_photo.png"
    db.session.commit()
    return jsonify(result='success')