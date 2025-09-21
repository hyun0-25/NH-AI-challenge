from pydantic import BaseModel
from typing import List


class ChatBotRequest(BaseModel):
    query: str
    docName: str
    userInfo: str


class ChatBotResponse(BaseModel):
    summary: str
    response: str
    docIds: List[int]
