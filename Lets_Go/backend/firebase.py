import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase with credentials
cred = credentials.Certificate("firebase_config.json")  # Path to your JSON key file
firebase_admin.initialize_app(cred)

# Get Firestore database instance
db = firestore.client()

# Function to add a topic
def add_journey(name: str, difficulty: str):
    doc_ref = db.collection("journey").add({"name": name, "difficulty": difficulty})
    return {"id": doc_ref[1].id, "name": name, "difficulty": difficulty}

# Function to get all topics
def get_all_journeys():
    topics_ref = db.collection("journey").stream()
    return [{"id": doc.id, **doc.to_dict()} for doc in topics_ref]
