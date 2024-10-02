from flask import Flask, session, request, send_from_directory, redirect, url_for, jsonify, make_response
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Outfit, OutfitItem, Item
import os


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client',
    template_folder='../client'
)


app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URI']  # how to connect to the db
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # optional performance thing
app.secret_key = os.environ['SECRET_KEY'] # grab the secret key from env variables

db.init_app(app)  # link sqlalchemy with flask
Migrate(app, db)  # set up db migration tool (alembic)
CORS(app, supports_credentials=True)  # set up cors


# BUILD ROUTES HERE -------------------------------------------------------->
@app.route("/", methods=["POST"])
def add_item_form():
    data = request.get_json()
    try:
        new_item = Item(
            category = data.get("category"),
            description = data.get("description"),
            brand = data.get("brand"),
            size = data.get("size"),
            image = data.get("image"),
        )
    except ValueError:
        return {"errors": ["validation errors"]}, 400
    db.session.add(new_item)
    db.session.commit()
    return new_item.to_dict(), 200


@app.route("/my_closet", methods=["GET"])
def all_items():
    items = Item.query.all()
    return [item.to_dict() for item in items], 200


@app.route("/my_closet/<int:id>", methods=["GET", "PATCH", "DELETE"])
def item_by_id(id):
    item = Item.query.filter(Item.id==id).first()
    if request.method == "GET":
        return item.to_dict(), 200
    elif request.method == "PATCH":
        data = request.get_json()
        for attr in data:
            setattr(item, attr, data[attr])
        db.session.add(item)
        db.session.commit()
        return item.to_dict(), 200
    elif request.method == "DELETE":
        db.session.delete(item)
        db.session.commit()
        return {}, 204
    

@app.route("/outfit_maker", methods=["GET", "POST"])
def make_save_outfits():
    if request.method == "GET":
        items = Item.query.all()
        return [item.to_dict() for item in items], 200
    elif request.method == "POST":
        data = request.get_json()
        try:
            new_outfit = Outfit(
                name = data.get("name")
            )
        except ValueError:
            return {"errors": ["validation errors"]}, 400
        db.session.add(new_outfit)
        db.session.commit()
        return new_outfit.to_dict(), 201


@app.route("/outfits", methods=["GET"])
def all_outfits():
    outfits = Outfit.query.all()
    return [outfit.to_dict() for outfit in outfits], 200


@app.route("/outfits/<int:id>", methods=["DELETE"])
def outfit_by_id(id):
    outfit = Outfit.query.filter(Outfit.id==id).first()
    db.session.delete(outfit)
    db.session.commit()
    return {}, 204

    

if __name__ == '__main__':
    app.run(port=5555, debug=True)