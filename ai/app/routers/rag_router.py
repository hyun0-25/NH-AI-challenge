from fastapi import APIRouter
from app.services.rag import main
from app.schemas.rag_schema import ChatBotRequest, ChatBotResponse

router = APIRouter()


@router.post("/chat-bot", response_model=ChatBotResponse)
def create_answer(request: ChatBotRequest):
    return main(request)
