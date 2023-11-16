from pymongo import MongoClient




def connect_to_database():
   
    try:
        client = MongoClient("mongodb+srv://amnahafedh:AmnaHafedh@smartcv.dsqergq.mongodb.net/")
        db = client["test_data_base"]  # Replace with your actual database name
        
        if db != None:
            print("Connected to database")
            
        return db
    
    except Exception as e:
        print(f"Error: {e}")
        return None


def insert_data(collection, data):
    collection.insert_one(data)


def find_user_by_credentials(username, db):
    print({"username": username})  # Updated key to "username"
    user = db.users.find_one({"username": username})  # Updated key to "username"
    if user:
        print('found it')
    else:
        print('not found')
    return user