from flask import Blueprint,jsonify, session

logout = Blueprint("logout", __name__, url_prefix='/api')

@logout.route("/logout", methods=["GET"])
def user_logout():
    session.clear()
    return jsonify(result = 'success')