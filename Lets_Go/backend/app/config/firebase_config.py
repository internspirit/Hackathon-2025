from firebase_admin import credentials, initialize_app
# from dotenv import load_dotenv
import os


def init_firebase():
    # load_dotenv()
    # Decode the base64 string and parse it as JSON

    cred = credentials.Certificate("firebase_config.json")  # Path to your JSON key file
    initialize_app(cred)