from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from preprocessor.dataloader import select_table
import settings
import os
import json
from typing import List, Dict
import click

def recommend_product(doc_name: str, persorna_info: str = "30대 청년 농부") -> Dict[str, List[int]]:
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

    # 검색기 생성 - 유사도 기반 상위 3개 문서 검색
    retriever = vector_store.as_retriever(
        search_kwargs={"k": 3, "filter": {"doc_name": f"{doc_name}"}},
    )

    # 테스트 질문
    query = f"{persorna_info}에게 상품을 추천해주세요."

    results = retriever.invoke(query)

    # 결과를 딕셔너리로 변환
    result_dict = {f"{doc_name}_id" : [result.metadata['doc_id'] for result in results]}

    return result_dict
        
@click.command()
@click.option('--doc-name', '-d', type=click.Choice(['finance', 'policy', 'insurance']), required=True, help='상품 유형 (finance/policy/insurance)')
@click.option('--persona-info', '-p', default="30대 청년 농부", help='사용자 정보 (기본값: 30대 청년 농부)')
def main(doc_name: str, persona_info: str):
    """상품 추천 시스템"""
    result_dict = recommend_product(doc_name=doc_name, persorna_info=persona_info)
    print(json.dumps(result_dict, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()