from fastapi import APIRouter
from app.services.recommend import main
from app.schemas.recommend_schema import RecommendRequest, RecommendResponse

router = APIRouter()


@router.post("/recommend", response_model=RecommendResponse)
def create_recommend(request: RecommendRequest):
    return main(request)
