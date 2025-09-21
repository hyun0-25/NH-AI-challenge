import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import pandas as pd
from chromadb.config import Settings
from langchain_chroma import Chroma
from typing import List, Dict, Any
import os
from langchain_openai import OpenAIEmbeddings
from preprocessor import fotmmated_document
import app.settings as settings


def create_vector_store(table_list: List[str], batch_size: int = 300) -> int:
    """
    문서들을 벡터 스토어로 변환 (배치 처리)
    Args:
        table_list: 벡터 스토어로 변환할 테이블 리스트

        batch_size: 배치 크기 (기본값: 300)
    Returns:
        벡터 스토어에 저장된 문서 개수
    """
    embeddings = OpenAIEmbeddings(model=settings.EMBEDDING_MODEL)

    vector_store = None
    total_docs = 0

    for table_name in table_list:
        print(f"Processing table: {table_name}")

        processed_docs = fotmmated_document(table_name=table_name)

        # 배치 단위로 처리
        for i in range(0, len(processed_docs), batch_size):
            batch_docs = processed_docs[i : i + batch_size]
            print(
                f"Processing batch {i//batch_size + 1}/{(len(processed_docs) + batch_size - 1)//batch_size} for {table_name}"
            )

            if vector_store is None:
                # 첫 번째 배치로 벡터 스토어 생성
                vector_store = Chroma.from_documents(
                    documents=batch_docs,
                    embedding=embeddings,
                    collection_name=settings.CHROMA_COLLECTION_NAME,
                    persist_directory=settings.CHROMA_DB_DIR,
                )
            else:
                # 기존 벡터 스토어에 추가
                vector_store.add_documents(batch_docs)

            total_docs += len(batch_docs)
            print(f"Added {len(batch_docs)} documents (total: {total_docs})")

        print(f"Completed processing {len(processed_docs)} documents from {table_name}")

    return total_docs


if __name__ == "__main__":
    create_vector_store(table_list=["finance", "insurance", "policy"])
