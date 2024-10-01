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





if __name__ == '__main__':
    app.run(port=5555, debug=True)