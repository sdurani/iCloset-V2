from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, relationship
from flask_bcrypt import Bcrypt

metadata = MetaData(naming_convention={
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
})

db = SQLAlchemy(metadata=metadata)
bcrypt = Bcrypt()



# BUILD MODELS HERE ---------------------------------------------->
class User(db.Model, SerializerMixin): # set up for future authentication/login feature
    __tablename__="users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    
    def __repr__(self):
        return f"<User {self.username}>"
    

class Outfit(db.Model, SerializerMixin):
    __tablename__="outfits"

    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String)

    outfititems = db.relationship('OutfitItem', back_populates='outfit', cascade='all, delete-orphan')

    serialize_rules = ('-outfititems.outfit',)

    @validates("name")
    def not_null(self, key, new_name):
        if not new_name:
            raise ValueError(f'outfit {key} cannot be blank.')
        else:
            return new_name

    def __repr__(self):
        return f"<Outfit {self.name} >"


class Item(db.Model, SerializerMixin):
    __tablename__="items"

    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    category = db.Column(db.String)
    description = db.Column(db.String)
    brand = db.Column(db.String)
    size = db.Column(db.String)
    image = db.Column(db.String)

    outfititems = db.relationship('OutfitItem', back_populates='item', cascade='all, delete-orphan')

    serialize_rules = ('-outfititems.item',)

    @validates("category", "description", "brand", "size", "image")
    def not_null(self, key, field):
        if not field:
            raise ValueError(f'{key} cannot be blank.')
        else:
            return field


    def __repr__(self):
        return f"<Item {self.category} {self.description} {self.brand} {self.size} {self.image}>"
    


class OutfitItem(db.Model, SerializerMixin):
    __tablename__="outfititems"

    id = db.Column(db.Integer, primary_key=True)
    outfit_id = db.Column(db.Integer, db.ForeignKey('outfits.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)

    outfit = db.relationship('Outfit', back_populates='outfititems', cascade='all, delete-orphan', single_parent=True)
    item = db.relationship('Item', back_populates='outfititems')

    serialize_rules = ('-outfit.outfititems', '-item.outfititems',)

    def __repr__(self):
        return f"<OutfitItem {self.id}>"
