from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="backend/config/config.env")

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
USER_AGENT = os.getenv("USER_AGENT")
HUGGING_FACE_KEY = os.getenv("HUGGING_FACE_KEY")
FINHUB_KEY  = os.getenv("FINHUB_KEY")