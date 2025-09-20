from dotenv import load_dotenv
import os
load_dotenv()

# Database
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_PORT = os.getenv("DATABASE_PORT")
DATABASE_USER = os.getenv("DATABASE_USER")  
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_NAME = os.getenv("DATABASE_NAME")

# OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL")
OPENAI_LLM_MODEL = os.getenv("OPENAI_LLM_MODEL")
TEMPERATURE = 0
MAX_TOKENS = 1000

# Chroma
CHROMA_DB_DIR = "./chroma_db"
CHROMA_COLLECTION_NAME = "nh_ai_idea_challenge"

# 추천 리스트 저장 경로
RECOMMEND_RESULT_DIR = "recommend_result"