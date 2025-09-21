import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

from preprocessor.dataloader import select_table
import settings
import os
import json
from typing import List, Dict
import click


def recommend_product(doc_name: str, persorna_info: str) -> Dict[str, List[int]]:
    """
    상품 추천

    Args:
        doc_name: "finance"|"policy"|"insurance"
        persorna_info: 사용자 정보
    Returns:
        result_dict: 상품 추천 결과

    Example:
        recommend_product(doc_name="finance", persorna_info="30대 청년 농부")
        >>> {"finance_id": [1, 2, 3]}
    """
    embeddings = OpenAIEmbeddings(model=settings.EMBEDDING_MODEL)

    # 벡터 저장소 로드
    vector_store = Chroma(
        collection_name=settings.CHROMA_COLLECTION_NAME,
        persist_directory=settings.CHROMA_DB_DIR,
        embedding_function=embeddings,
    )

    print(vector_store._collection.count())
    # 검색기 생성 - 유사도 기반 상위 3개 문서 검색
    retriever = vector_store.as_retriever(
        search_kwargs={"k": 3, "filter": {"doc_name": f"{doc_name}"}},
    )

    # 테스트 질문
    query = f"{persorna_info}에게 상품을 추천해주세요."
    results = retriever.invoke(query)

    # 결과를 딕셔너리로 변환
    result_dict = {f"recommendId": [result.metadata["doc_id"] for result in results]}
    print("response: ", result_dict)
    return result_dict


#### API 연결 코드 ####
# def main(request: RecommendRequest) -> RecommendResponse:
#     """상품 추천 시스템"""
#     print("request: ", request)
#     result_dict = recommend_product(
#         doc_name=request.docName, persorna_info=request.userInfo
#     )
#     return RecommendResponse(**result_dict)


#### API 연결 X ####
def main() -> RecommendResponse:
    """상품 추천 시스템"""
    result_dict = recommend_product(
        doc_name="finance",
        persorna_info="1995년생 청년 농부, 딸기 재배",
    )
    return RecommendResponse(**result_dict)


if __name__ == "__main__":
    main()
