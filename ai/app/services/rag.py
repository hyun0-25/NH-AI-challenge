import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import click
from schemas.rag_schema import ChatBotRequest, ChatBotResponse
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import app.settings as settings
import json


def rag_chain(query: str, doc_name: str):
    """
    retrieval 함수를 호출하고 결과를 반환

    Args:
        query: str 사용자 질문
        doc_name: str 문서 이름("finance"|"policy"|"insurance")

    Returns:
        results: 사용자 질문에 대한 rag 답변

    Example:
        rag_chain("청년 농부에게 추천할 금융 상품을 알려주세요", "finance")
        >>> {"summary": "응답 한 문장 요약", "response": "질문에 대한 근거 포함 대답 내용", "doc_ids": [doc_ids]}
    """

    # LLM 설정
    llm = ChatOpenAI(
        model=settings.OPENAI_LLM_MODEL,
        temperature=settings.TEMPERATURE,
        max_tokens=settings.MAX_TOKENS,
    )

    template = """질문에 해당하는 내용을 context를 기반으로 근거를 담아 답변해주세요. 질문을 답할 수 없는 경우는 친절하게 안내 방법을 제시해주세요. 답변은 summary와 response로 나누어 출력해주세요. 

<Context>
{context}=

<Question> 
{question}

<example>
{{"summary": "응답 한 문장 요약", "response": "질문에 대한 근거 포함 대답 내용", "doc_ids": {doc_ids}}}

<Answer>
"""

    prompt = ChatPromptTemplate.from_template(template)

    def retriever(query: str, doc_name: str):
        embeddings = OpenAIEmbeddings(
            model=settings.EMBEDDING_MODEL, api_key=settings.OPENAI_API_KEY
        )

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

        results = retriever.invoke(query)
        doc_ids = [result.metadata["doc_id"] for result in results]

        context = ""
        for result in results:
            context += result.page_content
            context += "\n\n"

        input = {"context": context, "question": query, "doc_ids": doc_ids}
        return input

    # RAG 체인: 쿼리 → 문서 검색 → 프롬프트 → LLM → 출력 파서
    rag_chain = retriever | prompt | llm | StrOutputParser()

    # 체인 실행
    output = rag_chain.invoke(query, doc_name=doc_name)
    return output


def main(request: ChatBotRequest) -> ChatBotResponse:
    """RAG 체인을 실행하여 질문에 대한 답변을 생성합니다."""
    rag_query = f"{request.userInfo}\n{request.query}"
    rag_response = rag_chain(query=rag_query, doc_name=request.docName)
    print(rag_response)
    # 문자열(JSON) -> dict
    rag_response_dict = json.loads(rag_response)

    # doc_ids -> docIds 매핑
    rag_response_dict["docIds"] = rag_response_dict.pop("doc_ids")

    # Pydantic 모델 생성
    return ChatBotResponse(**rag_response_dict)


if __name__ == "__main__":
    main()
