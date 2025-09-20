import pandas as pd
from utils import mysql_client, INSERT_QUERY_FINANCE_TABLE

def insert_finance_data(file_path: str) -> None:
    """
    테이블 데이터 삽입
    Args:
        file_path: 파일 경로
        table_name: 테이블 이름
    """
    try:
        df = pd.read_excel(file_path)

        # 결측값(NaN)을 None으로 변환하여 일관성 유지
        df = df.where(pd.notnull(df), None)

        connection = mysql_client()

        with connection.cursor() as cursor:
            for index, row in df.iterrows():
                cursor.execute(INSERT_QUERY_FINANCE_TABLE, tuple(row))

            connection.commit()
            print(f"completed: insert data {len(df)} rows.")

    except Exception as e:
        print(f"failed: {e}")
        if connection:
            connection.rollback()
    return None