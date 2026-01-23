import os, json
import firebase_admin
from firebase_admin import credentials, firestore

def get_db():
    if not firebase_admin._apps:
        sa_json = os.environ["FIREBASE_SERVICE_ACCOUNT_JSON"]
        cred = credentials.Certificate(json.loads(sa_json))
        firebase_admin.initialize_app(cred)
    return firestore.client()

db = get_db()
