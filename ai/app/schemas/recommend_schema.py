from pydantic import BaseModel
from typing import List


class RecommendRequest(BaseModel):
    docName: str
    userInfo: str


class RecommendResponse(BaseModel):
    recommendId: List[int]
