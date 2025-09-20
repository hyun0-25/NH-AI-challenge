import pandas as pd
from utils import mysql_client, SELECT_QUERY
from langchain_core.documents import Document

def select_table(table_name: str) -> pd.DataFrame:
    """
    테이블 조회 결과를 데이터프레임으로 반환
    Args:
        table_name: 테이블명 (finance|insurance|policy)
    Returns:
        result_df: 테이블 조회 결과를 데이터프레임으로 반환
    """
    try:
        connection = mysql_client()
        with connection.cursor() as cursor:
            cursor.execute(SELECT_QUERY.format(table_name=table_name))
            result = cursor.fetchall()

            # 컬럼명 추출
            columns = [desc[0] for desc in cursor.description]  
            result_df = pd.DataFrame(result, columns=columns)
            
    except Exception as e:
        print(f"failed: {e}")
        if connection:
            connection.rollback()

    return result_df


if __name__ == "__main__":
    table_name = "finance" 
    result_df = select_table(table_name)
    print(result_df)