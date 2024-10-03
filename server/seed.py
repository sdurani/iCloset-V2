from models import db, User, Outfit, Item, OutfitItem
from app import app
from faker import Faker

fake = Faker()

def run():
    User.query.delete()
    Outfit.query.delete()
    Item.query.delete()
    OutfitItem.query.delete()
    db.session.commit()


# FAKE USER OBJECTS
    print('Adding users...')
    users = []
    for i in range(10):
        username = fake.user_name()
        u = User(
            username = username
        )
        users.append(u)
    db.session.add_all(users)
    db.session.commit()


# FAKE ITEM OBJECTS
    print('Adding items...')
    items = [
        Item(
            image = "https://assets.aritzia.com/image/upload/w_1500/s24_04_a02_114724_1274_off_a",
            category = "Top",
            brand = "Wilfred",
            size = "S",
            description = "black halter neck silk top",
        ),
        Item(
            image = "https://assets.aritzia.com/image/upload/w_900/f24_a06_119038_32774_off_a",
            category = "Bottom",
            brand = "Aritzia",
            size = "L",
            description = "green knit sweatpants",
        ),
        Item(
            image = "https://assets.aritzia.com/image/upload/w_900/f24_a03_116209_6046_off_a",
            category = "Top",
            brand = "Nike",
            size = "M",
            description = "grey hoodie",
        ),
        Item(
            image = "https://assets.aritzia.com/image/upload/large/s24_10_a06_119432_30426_off_a.jpg",
            category = "Bottom",
            brand = "Denim Forum",
            size = "28",
            description = "light wash baggy jeans",
        ),
        Item(
            image = "https://assets.aritzia.com/image/upload/large/f23_04_a03_112762_31916_off_a.jpg",
            category = "Top",
            brand = "Sunday Best",
            size = "M",
            description = "thrifted knit wool sweater",
            # user_id = 1
        )
    ]
    db.session.add_all(items)
    db.session.commit()


# FAKE OUTFIT OBJECTS
    print('Adding outfits...')
    outfits = [
        Outfit(
            name = "fancy dinner",
            # user_id = 1,
            id = 2
        ), 
        Outfit(
            name = "casual friday",
            # user_id = 1,
            id = 3
        )
    ]
    db.session.add_all(outfits)
    db.session.commit()


# FAKE OUTFITITEM OBJECTS
    print('Adding outfititems...')
    outfititems = [
        OutfitItem(
            outfit_id = 3,
            item_id = 2
        ), 
        OutfitItem(
            outfit_id = 3,
            item_id = 3
        ), 
        OutfitItem(
            outfit_id = 2,
            item_id = 4
        ), 
        OutfitItem(
            outfit_id = 2,
            item_id = 1
        )
    ]
    db.session.add_all(outfititems)
    db.session.commit()



if __name__ == '__main__':
    with app.app_context():
        run()