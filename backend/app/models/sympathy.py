from app import db

class Sympathy(db.Model):
    __tablename__ = 'Sympathy'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id', ondelete='CASCADE'), nullable=False)
    article_id = db.Column(db.Integer, db.ForeignKey('Article.id', ondelete='CASCADE'), nullable=False)

    def __init__(self, user_id, article_id):
        self.user_id = user_id
        self.article_id = article_id
