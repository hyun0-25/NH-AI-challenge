import pandas as pd
from langchain_core.documents import Document
from preprocessor import select_table

def fotmmated_document(table_name: str) -> str:
    """
    금융|보험|정책 데이터를 문서 객체로 변환
    Args:
        table: 테이블 데이터
        table_name: 테이블명
    Returns:
        문서 객체
    """

    table = select_table(table_name)

    processed_docs = []
    for idx, row in table.iterrows():
        result_field = _combine_text_fields(row=row, table_name=table_name)
    
        docs = Document(
            page_content=result_field,
            metadata={
                "doc_name": table_name,
                "doc_id": row.get(f'{table_name}_id', '')
            }
        )
        processed_docs.append(docs)
    return processed_docs

def _combine_text_fields(row: pd.Series, table_name: str) -> str:
    """
    데이터베이스 행의 텍스트 필드들을 결합하여 하나의 문서로 만듦
    Args:
        row: 데이터베이스 행
        table_name: 테이블명
    Returns:
        결합된 텍스트 문서
    """
    if table_name == "finance":
        return f"""
금융상품 번호: {row.get('finance_id', '')}
상품명: {row.get('product_name', '')}
상품특징: {row.get('product_feature', '')}
대출대상: {row.get('loan_target', '')}
대출기간: {row.get('loan_period', '')}
대출한도: {row.get('loan_limit', '')}
상환방법: {row.get('repayment_method', '')}
원금 또는 이자 상환안내: {row.get('principal_repayment_guide', '')}
연체이자(지연배상금)안내: {row.get('overdue_guide', '')}
담보 및 보증여부: {row.get('collateral_guarantee', '')}
필요서류: {row.get('required_documents', '')}
고객부담비용(수수료): {row.get('customer_burden_costs', '')}
이자납입: {row.get('payment', '')}
유의사항: {row.get('precautions', '')}
기타: {row.get('others', '')}
준법감시인 심의필번호: {row.get('compliance_supervisor', '')}
대출금리: {row.get('loan_interest_rate', '')}
금리종류: {row.get('rate_type', '')}
            """.strip()

    elif table_name == "policy":
        return f"""
정책 번호: {row.get('policy_id', '')}
게시글 번호: {row.get('seq', '')}
제목: {row.get('title', '')}
내용: {row.get('contents', '')}
신청시작일: {row.get('appl_st_date', '')}
신청마감일: {row.get('appl_ed_date', '')}
지역명(시군구): {row.get('area2nm', '')}
담당기관/주관기관: {row.get('charge_agency', '')}
담당부서: {row.get('charge_dept', '')}
담당부서 전화번호: {row.get('charge_tel', '')}
지원대상/교육대상: {row.get('edu_target', '')}
공고 URL: {row.get('info_url', '')}
지원 금액: {row.get('price', '')}
총 수량: {row.get('tot_quantity', '')}
            """.strip()

    elif table_name == "insurance":
        return f"""
보험 번호: {row.get('insurance_id', '')}
보험명: {row.get('insurance_name', '')}
보험명 세부: {row.get('insurance_sub_name', '')}
보험 설명: {row.get('insurance_description', '')}
약관: {row.get('insurance_condition_type', '')}
보장: {row.get('insurance_coverage', '')}
보상재해: {row.get('insurance_disaster', '')}
가입대상 품목: {row.get('insurance_variety', '')}
보험의 목적: {row.get('insurance_purpose', '')}
보험개시(시기): {row.get('insurance_start_date', '')}
보장종료(종기): {row.get('insurance_end_date', '')}
지급 사유: {row.get('insurance_payment_reason', '')}
보험료 정부 지원율 최대: {row.get('insurance_government_support_max', '')}
보험료 정부 지원율 최소: {row.get('insurance_government_support_min', '')}
보험료 지방자치단체 지원율 최대: {row.get('insurance_local_government_support_max', '')}
보험료 지방자치단체 지원율 최소: {row.get('insurance_local_government_support_min', '')}
            """.strip()

    else:
        return " ".join([str(value) for value in row.values if pd.notna(value)])


if __name__ == "__main__":
    pass