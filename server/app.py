from flask import Flask, request
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


app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URI']  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  
# <---- set up for future authentication feature ---->
# app.secret_key = os.environ['SECRET_KEY'] 

db.init_app(app) 
Migrate(app, db)  
CORS(app, supports_credentials=True) 


# ROUTES -------------------------------------------------------->
@app.route('/', methods=['GET'])
def homepage():
       return "<h1>| iCloset | </h1>", 200


@app.route("/api/add_item", methods=["POST"])
def add_item_form():
    data = request.get_json()
    new_item = Item(
        category = data.get("category"),
        description = data.get("description"),
        brand = data.get("brand"),
        size = data.get("size"),
        image = data.get("image"),
    )
        
    db.session.add(new_item)
    db.session.commit()
    return new_item.to_dict(), 201


@app.route("/api/my_closet", methods=["GET"])
def all_items():
    items = Item.query.all()
    return [item.to_dict() for item in items], 200


@app.route("/api/my_closet/<int:id>", methods=["GET", "DELETE"])
def item_by_id(id):
    item = Item.query.filter(Item.id==id).first()
    if request.method == "GET":
        return item.to_dict(), 200
    elif request.method == "DELETE":
        db.session.delete(item)
        db.session.commit()
        return {}, 204
    # <--- add patch feature later ----->
    # elif request.method == "PATCH":
    #     data = request.get_json()
    #     for attr in data:
    #         setattr(item, attr, data[attr])
    #     db.session.add(item)
    #     db.session.commit()
    #     return item.to_dict(), 200
    

@app.route("/api/outfit_maker", methods=["GET", "POST"])
def make_save_outfits():
    if request.method == "GET":
        items = Item.query.all()
        return [item.to_dict() for item in items], 200
    elif request.method == "POST":
        data = request.get_json()
        try:
            new_outfit = Outfit(
                name=data.get("name")
            )
            db.session.add(new_outfit)
            db.session.commit()

            top_item_id = data.get("top_item_id")
            bottom_item_id = data.get("bottom_item_id")

            if top_item_id and bottom_item_id:
                outfititem_top = OutfitItem(
                    outfit_id=new_outfit.id,
                    item_id=top_item_id
                )
                outfititem_bottom = OutfitItem(
                    outfit_id=new_outfit.id,
                    item_id=bottom_item_id
                )
                db.session.add(outfititem_top)
                db.session.add(outfititem_bottom)
                db.session.commit()

            return new_outfit.to_dict(), 201
        except ValueError:
            return {"errors": ["validation errors"]}, 400


@app.route("/api/my_outfits", methods=["GET"])
def all_outfits():
    outfits = Outfit.query.all()
    return [outfit.to_dict() for outfit in outfits], 200


@app.route("/api/my_outfits/<int:id>", methods=["DELETE"])
def outfit_by_id(id):
    outfit = Outfit.query.filter(Outfit.id==id).first()
    db.session.delete(outfit)
    db.session.commit()
    return {}, 204

    

if __name__ == '__main__':
    app.run(port=5555, debug=True)