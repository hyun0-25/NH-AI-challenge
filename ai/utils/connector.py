import os
import pymysql
import settings

def mysql_client():
    """
    MySQL 연결 클라이언트 반환
    Returns:
        connection: MySQL 연결 클라이언트
    """
    connection = pymysql.connect(
        host=settings.DATABASE_HOST,
        port=int(settings.DATABASE_PORT),
        user=settings.DATABASE_USER,
        password=settings.DATABASE_PASSWORD,
        database=settings.DATABASE_NAME
    )
    return connection