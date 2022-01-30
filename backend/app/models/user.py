from app import db


class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    nickname = db.Column(db.String(255), nullable=False)
    photo = db.Column(db.String(255), nullable=True)

    def __init__(self, email, password, nickname, photo):
        self.email = email
        self.password = password
        self.nickname = nickname
        self.photo = photo
